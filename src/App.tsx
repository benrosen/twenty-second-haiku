import {
  CheckCircle,
  InfoOutlined,
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
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setDictionary(randomWords(17));
  }, []);

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
                <IconButton aria-label="info">
                  <InfoOutlined color={"primary"} />
                </IconButton>
              </Stack>

              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <IconButton aria-label="refresh">
                  <Refresh />
                </IconButton>
                <Chip icon={<Timer />} label="00:00" color={"error"} />
              </Stack>
            </Stack>
            <Paper variant={"outlined"} sx={{ padding: 2 }}>
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
            </Paper>
            <Stack spacing={1}>
              <TextField
                autoFocus={true}
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
            <Stack>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
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
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
