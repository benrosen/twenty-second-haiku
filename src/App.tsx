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
import { useMemo, useState } from "react";
import { syllable } from "syllable";

export const App = () => {
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
                    aria-label={"refresh"}
                    onClick={() => {
                      setFirstLine("");
                      setSecondLine("");
                      setThirdLine("");
                      setDictionary(randomWords(17));
                    }}
                  >
                    <Refresh />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label={"play"}
                    onClick={() => {
                      setDictionary(randomWords(17));
                    }}
                  >
                    <PlayArrow />
                  </IconButton>
                )}
                <Chip icon={<Timer />} label="00:20:000" />
              </Stack>
            </Stack>
            <Paper variant={"outlined"} sx={{ padding: 2 }}>
              {dictionary.length > 0 ? (
                <Grid container spacing={2}>
                  {dictionary.map((word) => {
                    const poem = firstLine + " " + secondLine + " " + thirdLine;
                    const isWordUsed = poem
                      .toLowerCase()
                      .split(" ")
                      .includes(word);
                    return (
                      <Grid item xs={"auto"}>
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
                disabled={dictionary.length < 1}
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
                disabled={dictionary.length < 1}
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
                disabled={dictionary.length < 1}
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
