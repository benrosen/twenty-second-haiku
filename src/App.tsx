import {
  CheckCircle,
  GitHub,
  PlayArrow,
  Refresh,
  ReportProblem,
  SportsEsports,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import randomWords from "random-words";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { syllable } from "syllable";

export const App = () => {
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);

  const [timeRemainingAtSubmission, setTimeRemainingAtSubmission] = useState<
    number | null
  >(null);

  const [timerDurationMilliseconds] = useState<number>(20000);

  const [remainingMilliseconds, setRemainingMilliseconds] = useState<number>(
    timerDurationMilliseconds
  );

  const [timerInterval] = useState<number>(10);

  const playButtonRef = useRef<HTMLButtonElement>(null);

  const refreshButtonRef = useRef<HTMLButtonElement>(null);

  const firstLineRef = useRef<HTMLInputElement>(null);

  const [dictionary, setDictionary] = useState<string[]>([]);

  const [firstLine, setFirstLine] = useState<string>("");

  const [secondLine, setSecondLine] = useState<string>("");

  const [thirdLine, setThirdLine] = useState<string>("");

  const firstLineSyllables = useMemo(() => {
    return syllable(firstLine);
  }, [firstLine]);

  const isFirstLineFiveSyllables = useMemo(() => {
    return firstLineSyllables === 5;
  }, [firstLineSyllables]);

  const secondLineSyllables = useMemo(() => {
    return syllable(secondLine);
  }, [secondLine]);

  const isSecondLineSevenSyllables = useMemo(() => {
    return secondLineSyllables === 7;
  }, [secondLineSyllables]);

  const thirdLineSyllables = useMemo(() => {
    return syllable(thirdLine);
  }, [thirdLine]);

  const isThirdLineFiveSyllables = useMemo(() => {
    return thirdLineSyllables === 5;
  }, [thirdLineSyllables]);

  useEffect(() => {
    if (dictionary.length > 0) {
      firstLineRef.current && firstLineRef.current.focus();
    }
  }, [dictionary]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStartedAt === null) {
        return;
      }

      if (timeRemainingAtSubmission !== null) {
        return;
      }

      const elapsedTime = Date.now() - timerStartedAt;

      const remainingTime = Math.max(
        0,
        timerDurationMilliseconds - elapsedTime
      );

      setRemainingMilliseconds(remainingTime);
    }, timerInterval);

    return () => {
      clearInterval(interval);
    };
  }, [
    timeRemainingAtSubmission,
    timerDurationMilliseconds,
    timerInterval,
    timerStartedAt,
  ]);

  const refresh = useCallback(() => {
    setFirstLine("");
    setSecondLine("");
    setThirdLine("");
    setDictionary(randomWords(10));
    setTimerStartedAt(Date.now());
    setTimeRemainingAtSubmission(null);
  }, []);

  return (
    <Container maxWidth={"sm"} style={{ padding: "1rem" }}>
      <Paper variant={"outlined"}>
        <Stack spacing={2} padding={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={2}
          >
            <Chip
              style={{ fontSize: "2rem", padding: "2rem" }}
              label={`${Math.floor(remainingMilliseconds / 1000)
                .toString()
                .padStart(2, "0")}:${(remainingMilliseconds % 1000)
                .toString()
                .padStart(3, "0")}`}
              color={
                remainingMilliseconds < timerDurationMilliseconds / 4
                  ? "error"
                  : remainingMilliseconds < timerDurationMilliseconds / 2
                  ? "warning"
                  : "info"
              }
            />
            {dictionary.length > 0 ? (
              <Fab
                size={"large"}
                color={"primary"}
                ref={refreshButtonRef}
                aria-label={"refresh"}
                onClick={() => {
                  refresh();
                }}
              >
                <Refresh />
              </Fab>
            ) : (
              <Fab
                size={"large"}
                color={"primary"}
                ref={playButtonRef}
                aria-label={"play"}
                onClick={() => {
                  refresh();
                }}
              >
                <PlayArrow />
              </Fab>
            )}
          </Stack>
          <Paper sx={{ padding: 4 }} elevation={0}>
            {dictionary.length > 0 ? (
              <Grid container spacing={2}>
                {dictionary.map((word, index) => {
                  const poem = firstLine + " " + secondLine + " " + thirdLine;

                  const poemWithoutPunctuation = poem.replace(
                    /[^\p{L}\p{N}\s]/gu,
                    ""
                  );

                  const isWordUsed = poemWithoutPunctuation
                    .toLowerCase()
                    .split(" ")
                    .includes(word);

                  return (
                    <Grid item xs={"auto"} key={index}>
                      <Chip
                        sx={{ fontSize: "1rem" }}
                        label={word}
                        variant={isWordUsed ? undefined : "outlined"}
                        color={"success"}
                      ></Chip>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography>
                Compose a haiku from random words in twenty seconds.
              </Typography>
            )}
          </Paper>
          <Stack spacing={1}>
            <TextField
              onClick={() => {
                if (dictionary.length < 1 && playButtonRef.current) {
                  playButtonRef.current.focus();
                }

                if (remainingMilliseconds < 1 && refreshButtonRef.current) {
                  refreshButtonRef.current.focus();
                }
              }}
              inputRef={firstLineRef}
              disabled={dictionary.length < 1 || remainingMilliseconds < 1}
              value={firstLine}
              onChange={(event) => {
                setFirstLine(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    {firstLineSyllables}/5
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position={"start"}>
                    {isFirstLineFiveSyllables ? (
                      <CheckCircle color={"success"} />
                    ) : (
                      <ReportProblem color={"warning"}></ReportProblem>
                    )}
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              onClick={() => {
                if (dictionary.length < 1 && playButtonRef.current) {
                  playButtonRef.current.focus();
                }

                if (remainingMilliseconds < 1 && refreshButtonRef.current) {
                  refreshButtonRef.current.focus();
                }
              }}
              disabled={dictionary.length < 1 || remainingMilliseconds < 1}
              value={secondLine}
              onChange={(event) => {
                setSecondLine(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    {secondLineSyllables}/7
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position={"start"}>
                    {isSecondLineSevenSyllables ? (
                      <CheckCircle color={"success"} />
                    ) : (
                      <ReportProblem color={"warning"}></ReportProblem>
                    )}
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              onClick={() => {
                if (dictionary.length < 1 && playButtonRef.current) {
                  playButtonRef.current.focus();
                }

                if (remainingMilliseconds < 1 && refreshButtonRef.current) {
                  refreshButtonRef.current.focus();
                }
              }}
              disabled={dictionary.length < 1 || remainingMilliseconds < 1}
              value={thirdLine}
              onChange={(event) => {
                setThirdLine(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    {thirdLineSyllables}/5
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position={"start"}>
                    {isThirdLineFiveSyllables ? (
                      <CheckCircle color={"success"} />
                    ) : (
                      <ReportProblem color={"warning"}></ReportProblem>
                    )}
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Stack>
          <Button
            fullWidth={true}
            size={"large"}
            variant={"contained"}
            disabled={
              !(
                remainingMilliseconds > 0 &&
                isFirstLineFiveSyllables &&
                isSecondLineSevenSyllables &&
                isThirdLineFiveSyllables
              )
            }
            onClick={() => {
              setTimeRemainingAtSubmission(remainingMilliseconds);
            }}
          >
            Submit
          </Button>
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            padding={1}
          >
            <IconButton
              href={"https://github.com/benrosen/twenty-second-haiku"}
              target={"_blank"}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href={"https://brosen.itch.io/twenty-second-haiku"}
              target={"_blank"}
            >
              <SportsEsports />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <Dialog
        open={timeRemainingAtSubmission !== null || remainingMilliseconds < 1}
        aria-labelledby="alert-dialog-title"
      >
        {timeRemainingAtSubmission === null ? (
          <>
            <DialogTitle id="alert-dialog-title">Out of time</DialogTitle>
            <DialogContent>
              <DialogContentText>The game is over.</DialogContentText>
              <DialogContentText>
                Next time, submit your haiku
              </DialogContentText>
              <DialogContentText>Before time runs out.</DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">You did it!</DialogTitle>
            <DialogContent>
              <DialogContentText>Congratulations!</DialogContentText>
              <DialogContentText>It's hard to be creative.</DialogContentText>
              <DialogContentText>I am proud of you</DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button
            onClick={() => {
              refresh();
            }}
          >
            Play again
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
