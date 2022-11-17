import {
  CheckCircle,
  PlayArrow,
  Refresh,
  ReportProblem,
  Timer,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import randomWords from "random-words";
import { useEffect, useMemo, useRef, useState } from "react";
import { syllable } from "syllable";

export const App = () => {
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
      dictionary.length > 0 &&
        setRemainingMilliseconds((remainingMilliseconds) => {
          return Math.max(0, remainingMilliseconds - timerInterval);
        });
    }, timerInterval);

    return () => {
      clearInterval(interval);
    };
  }, [dictionary.length, timerInterval]);

  return (
    <Container maxWidth={"sm"}>
      <Stack spacing={5}>
        <Paper sx={{ padding: 0 }} elevation={0}>
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant={"h6"}>Twenty Second Haiku</Typography>
              </Stack>

              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {dictionary.length > 0 ? (
                  <IconButton
                    ref={refreshButtonRef}
                    aria-label={"refresh"}
                    onClick={() => {
                      setFirstLine("");
                      setSecondLine("");
                      setThirdLine("");
                      setDictionary(randomWords(17));
                      setRemainingMilliseconds(timerDurationMilliseconds);
                    }}
                  >
                    <Refresh color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton
                    ref={playButtonRef}
                    aria-label={"play"}
                    onClick={() => {
                      setDictionary(randomWords(17));
                    }}
                  >
                    <PlayArrow color={"primary"} />
                  </IconButton>
                )}
                <Chip
                  icon={<Timer />}
                  label={`00:${Math.floor(remainingMilliseconds / 1000)
                    .toString()
                    .padStart(2, "0")}:${(remainingMilliseconds % 1000)
                    .toString()
                    .padStart(3, "0")}`}
                  color={
                    remainingMilliseconds < timerDurationMilliseconds / 4
                      ? "error"
                      : remainingMilliseconds < timerDurationMilliseconds / 2
                      ? "warning"
                      : "primary"
                  }
                  variant={
                    remainingMilliseconds < timerDurationMilliseconds / 2
                      ? undefined
                      : "outlined"
                  }
                />
              </Stack>
            </Stack>
            <Paper variant={"outlined"} sx={{ padding: 2 }}>
              {dictionary.length > 0 ? (
                <Grid container spacing={2}>
                  {dictionary.map((word, index) => {
                    const poem = firstLine + " " + secondLine + " " + thirdLine;
                    const isWordUsed = poem
                      .toLowerCase()
                      .split(" ")
                      .includes(word);
                    return (
                      <Grid item xs={"auto"} key={index}>
                        <Chip
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
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
