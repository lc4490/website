"use client";
// base imports
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  Grid,
  Divider,
  Drawer,
  IconButton,
  Link as MUILink,
  Chip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

// icon imports
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InfoIcon from "@mui/icons-material/Info";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPython,
  faJava,
  faCss3,
  faHtml5,
  faJs,
  faNodeJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
  faC,
  faFireFlameCurved,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

// image import
import Image from "next/image";
import NextLink from "next/link";

// theme imports
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  alpha,
} from "@mui/material";

// slideshow imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// ---------- DATA ----------
const projects = [
  {
    name: "trainerGPT",
    description:
      "All‑in‑one trainer: AI plans, equipment detection via camera, exportable workout calendar, and pantry → recipe generation.",
    skills: [
      "Next.js",
      "React",
      "Firebase",
      "OpenAI",
      "JavaScript",
      "Postman",
      "RAG",
      "Node.js",
      "Clerk",
      "Stripe",
    ],
    image: "/trainergpt.png",
    link: "https://trainer-gpt.vercel.app",
  },
  {
    name: "Chatstarter",
    description:
      "Social app with friends, chat, voice/video calls, and AI moderation.",
    skills: [
      "Next.js",
      "React",
      "Typescript",
      "Convex",
      "Clerk",
      "GROQ",
      "Livekit",
    ],
    image: "/chatstarter.png",
    link: "https://chatstarter-leonardochao.vercel.app/",
  },
  {
    name: "J.A.R.V.I.S.",
    description: "Voice‑responsive AI chatbot with multi‑language support.",
    skills: [
      "Next.js",
      "React",
      "Firebase",
      "OpenAI",
      "JavaScript",
      "Postman",
      "RAG",
      "Node.js",
    ],
    image: "/jarvis.png",
    link: "https://leonardochao-jarvis.vercel.app",
  },
  {
    name: "CustomerChurnPrediction",
    description:
      "End‑to‑end churn prediction with multiple ML models deployed via Streamlit.",
    skills: ["Python", "Streamlit", "Pandas", "Numpy", "Machine Learning"],
    image: "/customerchurn.png",
    link: "https://leochao-customer-churn-prediction.streamlit.app",
  },
  {
    name: "AI_Trainer",
    description:
      "Chat interface + API endpoints for AI training assistant with multilingual support.",
    skills: [
      "Next.js",
      "React",
      "Firebase",
      "OpenAI",
      "JavaScript",
      "Postman",
      "RAG",
      "Node.js",
    ],
    image: "/ai_trainer.png",
    link: "https://leonardochao-ai-trainer.vercel.app",
  },
  {
    name: "my_Pantry",
    description:
      "Pantry tracker with camera recognition and AI recipe generation.",
    skills: ["Next.js", "React", "Firebase", "OpenAI", "JavaScript", "Node.js"],
    image: "/mypantry.png",
    link: "https://leonardochao-my-pantry.vercel.app",
  },
  {
    name: "lineup_Tracker",
    description: "Track NBA lineups via web scraping and interactive subsets.",
    skills: ["Python", "BeautifulSoup", "Requests"],
    image: "/lineuptracker.png",
    link: "https://github.com/lc4490/lineupTracker/blob/main/README.md",
  },
  {
    name: "NBA Player Stat Analysis",
    description: "Basketball‑Reference fetch with STDEV analytics per player.",
    skills: ["Python", "Pandas", "Numpy"],
    image: "/statanalysis.png",
    link: "https://github.com/lc4490/findSTDev/blob/main/README.md",
  },
  {
    name: "Stocks = Steals + Blocks",
    description: "On‑device table parsing and stat aggregation.",
    skills: ["Python", "Pandas", "Numpy"],
    image: "/stocks.png",
    link: "https://github.com/lc4490/stocks/blob/main/README.md",
  },
  {
    name: "MacroTracker",
    description:
      "Track macros, manage recipes, and calculate nutrition with a simple UI.",
    skills: ["Python", "tkinter"],
    image: "/macrotracker.png",
    link: "https://github.com/lc4490/macro-tracker/blob/master/README.md",
  },
  {
    name: "PyJack",
    description: "Python blackjack with two dealer AIs and ASCII cards.",
    skills: ["Python"],
    image: "/pyjack.png",
    link: "https://github.com/lc4490/blackjack/blob/master/README.md",
  },
  {
    name: "Dandeflies",
    description: "p5.js animation blending dandelions and butterflies.",
    skills: ["JavaScript", "HTML", "CSS"],
    image: "/dandeflies.png",
    link: "https://lc4490.github.io/home/dandeflies/dandeflies.html",
  },
  {
    name: "Star_Carr",
    description: "Informational site about the Star Carr archaeological site.",
    skills: ["HTML", "CSS"],
    image: "/star_carr.png",
    link: "https://lc4490.github.io/star_carr/",
  },
  {
    name: "Erlitou",
    description: "Informational site about the Erlitou archaeological site.",
    skills: ["HTML", "CSS"],
    image: "/erlitou.png",
    link: "https://lc4490.github.io/erlitou/",
  },
  {
    name: "nyu_shell",
    description: "Linux shell clone in C.",
    skills: ["C"],
    image: "/nyush.png",
    link: "https://github.com/lc4490/nyush/blob/main/README.md",
  },
];

const skills = [
  { name: "Python", icon: faPython },
  { name: "Next.js", icon: faNodeJs },
  { name: "React", icon: faReact },
  { name: "Firebase", icon: faFireFlameCurved },
  { name: "OpenAI", icon: faBrain },
  { name: "Postman" },
  { name: "RAG" },
  { name: "Node.js" },
  { name: "Clerk" },
  { name: "Stripe" },
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3 },
  { name: "JavaScript", icon: faJs },
  { name: "BeautifulSoup" },
  { name: "Requests" },
  { name: "Numpy" },
  { name: "Pandas" },
  { name: "Java", icon: faJava },
  { name: "C", icon: faC },
  { name: "Streamlit" },
  { name: "GROQ" },
  { name: "Machine Learning" },
];

// ---------- THEME ----------
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === "dark" ? "#add8e6" : "#0ea5e9" },
      secondary: { main: mode === "dark" ? "#a78bfa" : "#8b5cf6" },
      background: {
        default: mode === "dark" ? "#0b0b0c" : "#f8fafc",
        paper: mode === "dark" ? "#111113" : "#ffffff",
        bubbles: mode === "dark" ? "#151517" : "#f1f5f9",
        userBubble: mode === "dark" ? "#29B560" : "#95EC69",
      },
    },
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      button: { textTransform: "none", fontWeight: 700 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          body: {
            backgroundImage:
              mode === "dark"
                ? "radial-gradient(circle at 20% 20%, rgba(167,139,250,.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(14,165,233,.12), transparent 35%)"
                : "radial-gradient(circle at 20% 20%, rgba(14,165,233,.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(139,92,246,.12), transparent 35%)",
          },
        },
      },
    },
  });

// ACCENTS
const ACCENTS = [
  "#7aa7ff",
  "#7fe0b0",
  "#ffc66e",
  "#d9a6ff",
  "#ff9db2",
  "#9bb4ff",
  "#96ddff",
];

// ---------- COMPONENT ----------
export default function Home() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  useEffect(() => setDarkMode(prefersDarkMode), [prefersDarkMode]);

  const theme = useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // description modal
  const [openDesModal, setOpenDesModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const handleDesModal = (index) => {
    setSelectedProject(index);
    setOpenDesModal(true);
  };

  // slideshow settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: !isMobile,
    pauseOnHover: true,
  };

  // skill filter
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const handleSkillToggle = (skill) => {
    const newSelected = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSelected);
    if (newSelected.length === 0) setFilteredProjects(projects);
    else
      setFilteredProjects(
        projects.filter((p) => newSelected.some((s) => p.skills.includes(s)))
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backdropFilter: "saturate(180%) blur(12px)",
          backgroundColor: (t) => alpha(t.palette.background.default, 0.75),
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Stack direction="row" gap={1.5} alignItems="center">
              {/* <Button
                component={NextLink}
                href="#home"
                color="inherit"
                sx={{ fontWeight: 800 }}
              >
                <Typography variant="h6">Leo Chao</Typography>
              </Button> */}
              {!isMobile && (
                <Stack direction="row" gap={1}>
                  {[
                    { href: "#bio", label: "Bio" },
                    { href: "#skills", label: "Skills" },
                    { href: "#projects", label: "Projects" },
                    { href: "/Resume.pdf", label: "Resume", external: true },
                  ].map((item) => (
                    <Button
                      key={item.label}
                      component={NextLink}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      color="inherit"
                      sx={{
                        borderRadius: 2,
                        px: 1.5,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.text.primary,
                            0.08
                          ),
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              )}
            </Stack>

            <Stack direction="row" gap={1} alignItems="center">
              {!isMobile && (
                <Stack direction="row" gap={1}>
                  <IconButton
                    onClick={() => setDarkMode((v) => !v)}
                    color="inherit"
                    aria-label="Toggle dark mode"
                    anchor={isMobile ? "left" : "right"}
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  <IconButton
                    component={MUILink}
                    href="https://github.com/lc4490"
                    target="_blank"
                    color="inherit"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    component={MUILink}
                    href="https://www.linkedin.com/in/leo-chao-0334602a6/"
                    target="_blank"
                    color="inherit"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component={MUILink}
                    href="mailto:lc4490@nyu.edu"
                    color="inherit"
                  >
                    <EmailIcon />
                  </IconButton>
                </Stack>
              )}

              {isMobile && (
                <Box width="90vw" display="flex" justifyContent="space-between">
                  <IconButton
                    onClick={() => setDarkMode((v) => !v)}
                    color="inherit"
                    aria-label="Toggle dark mode"
                    anchor={isMobile ? "left" : "right"}
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  <IconButton
                    onClick={() => setDrawerOpen(true)}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800}>
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 2 }} />
          {[
            { href: "#bio", label: "Bio" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "/Resume.pdf", label: "Resume", external: true },
          ].map((item) => (
            <Button
              key={item.label}
              component={NextLink}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              onClick={() => setDrawerOpen(false)}
              sx={{
                justifyContent: "flex-start",
                mb: 0.5,
                py: 1.25,
                fontSize: { xs: 16, sm: 14 },
              }}
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
          <Stack direction="row" gap={1} sx={{ mt: "auto" }}>
            <IconButton
              component={MUILink}
              href="https://github.com/lc4490"
              target="_blank"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component={MUILink}
              href="https://www.linkedin.com/in/leo-chao-0334602a6/"
              target="_blank"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component={MUILink}
              href="mailto:lc4490@nyu.edu"
              color="inherit"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Box>
      </Drawer>

      {/* BIO */}
      <Container id="bio" maxWidth="lg" sx={{ py: { xs: 6, sm: 8 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid
            item
            xs={12}
            md={5}
            display="flex"
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            <Box
              sx={{
                position: "relative",
                width: "75%",
                aspectRatio: "1/1",
                mt: 5,
              }}
            >
              <Image
                src="/pic00.jpg"
                alt="Leo Chao"
                fill
                style={{ objectFit: "cover", borderRadius: 16 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "clamp(24px, 7vw, 30px)", sm: 40 } }}
              >
                Hi, I’m Leo Chao.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                I’m a recent Computer Science & Data Science graduate from NYU.
                I build full‑stack apps, analyze data, and ship user‑centric
                products. I’m fluent across modern web stacks and love turning
                ideas into polished, performant experiences.
              </Typography>
              <Stack direction="row" gap={1}>
                <Button
                  component={NextLink}
                  href="/Resume.pdf"
                  target="_blank"
                  variant="contained"
                >
                  View Resume
                </Button>
                <Button
                  component={NextLink}
                  href="#projects"
                  variant="outlined"
                >
                  See Projects
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* HERO / SLIDESHOW */}
      <Box
        id="home"
        sx={
          {
            // backgroundColor: "background.bubbles"
          }
        }
      >
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Slider {...settings}>
              {projects.slice(0, 5).map((project, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    height: { xs: 220, sm: 360, md: 460 },
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,.0) 10%, rgba(0,0,0,.6) 80%)",
                    }}
                  />
                  <Container
                    maxWidth="lg"
                    sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
                  >
                    <Stack
                      spacing={1.2}
                      sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 2.5, sm: 3.5 } }}
                    >
                      <Typography
                        variant="h4"
                        color="#fff"
                        fontWeight={800}
                        sx={{
                          fontSize: {
                            xs: "clamp(20px, 6vw, 28px)",
                            sm: "clamp(22px, 4vw, 32px)",
                          },
                        }}
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fff"
                        sx={{
                          fontSize: {
                            xs: "clamp(12px, 3.4vw, 14px)",
                            sm: "clamp(13px, 2vw, 16px)",
                          },
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Stack direction="row" gap={1}>
                        <Button
                          component={MUILink}
                          href={project.link}
                          target="_blank"
                          variant="contained"
                          color="primary"
                        >
                          View project
                        </Button>
                        <Button
                          onClick={() => handleDesModal(index)}
                          variant="outlined"
                          sx={{
                            color: "#fff",
                            borderColor: alpha("#fff", 0.6),
                          }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </Stack>
                  </Container>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>

      {/* SKILLS */}
      <Container id="skills" maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Stack
          direction="row"
          alignItems="center"
          gap={1.5}
          sx={{ mb: 2, mt: isMobile ? 5 : 2 }}
        >
          <FilterAltIcon />
          <Typography variant="h4">Skills</Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {skills.map(({ name, icon }) => (
            <Chip
              key={name}
              size={isMobile ? "medium" : "small"}
              label={
                <Stack direction="row" alignItems="center" gap={1}>
                  {icon ? <FontAwesomeIcon icon={icon} width={14} /> : null}
                  <span>{name}</span>
                </Stack>
              }
              onClick={() => handleSkillToggle(name)}
              variant={selectedSkills.includes(name) ? "filled" : "outlined"}
              color={selectedSkills.includes(name) ? "primary" : "default"}
              sx={{
                px: { xs: 1.25, sm: 1 },
                minHeight: { xs: 36, sm: 28 },
                "& .MuiChip-label": { fontWeight: 700 },
              }}
            />
          ))}
        </Stack>
      </Container>

      {/* PROJECTS */}
      <Container id="projects" maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            mt: isMobile ? 5 : 2,
            // fontSize: { xs: "clamp(22px, 6vw, 28px)", sm: 32 },
          }}
        >
          Projects
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
          {filteredProjects.map((p, index) => (
            <Grid key={p.name + index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // background: (t) =>
                  //   `linear-gradient(180deg, ${alpha(
                  //     t.palette.background.paper,
                  //     0.9
                  //   )}, ${alpha(t.palette.background.paper, 0.95)})`,
                  background: `linear-gradient(90deg, ${alpha(
                    ACCENTS[index % ACCENTS.length],
                    0.35
                  )}, transparent 35%)`,
                  boxShadow: 2,
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}
              >
                <CardActionArea
                  component={MUILink}
                  href={p.link}
                  target="_blank"
                  sx={{ borderRadius: 2 }}
                >
                  <CardMedia
                    sx={{
                      position: "relative",
                      pt: { xs: "62%", sm: "56.25%" },
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </CardMedia>
                </CardActionArea>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    {p.description}
                  </Typography>
                  <Stack direction="row" gap={0.75} flexWrap="wrap">
                    {p.skills.slice(0, 4).map((s) => (
                      <Chip key={s} label={s} size="small" variant="outlined" />
                    ))}
                    {p.skills.length > 4 && (
                      <Chip size="small" label={`+${p.skills.length - 4}`} />
                    )}
                  </Stack>
                  <Stack direction="row" gap={1} sx={{ mt: 2 }}>
                    <Button
                      component={MUILink}
                      href={p.link}
                      target="_blank"
                      size="small"
                      variant="contained"
                    >
                      Open
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<InfoIcon />}
                      onClick={() => handleDesModal(index)}
                    >
                      Details
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* DESCRIPTION MODAL */}
      <Modal open={openDesModal} onClose={() => setOpenDesModal(false)}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 560 },
            maxHeight: "80vh",
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Stack gap={2}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                pt: "56.25%",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src={projects[selectedProject].image}
                alt={projects[selectedProject].name}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Typography variant="h5" fontWeight={800}>
              {projects[selectedProject].name}
            </Typography>
            <Typography>
              <strong>Skills:</strong>{" "}
              {projects[selectedProject].skills.join(", ")}
            </Typography>
            <Typography>
              <strong>Description:</strong>{" "}
              {projects[selectedProject].description}
            </Typography>
            <Stack direction="row" gap={1}>
              <Button
                component={MUILink}
                href={projects[selectedProject].link}
                target="_blank"
                variant="contained"
              >
                Visit
              </Button>
              <Button variant="outlined" onClick={() => setOpenDesModal(false)}>
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      {/* FOOTER */}
      <Divider />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack alignItems="center" gap={2}>
          <Stack direction="row" gap={1.5}>
            <IconButton
              component={MUILink}
              href="https://github.com/lc4490"
              target="_blank"
              color="inherit"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component={MUILink}
              href="https://www.linkedin.com/in/leo-chao-0334602a6/"
              target="_blank"
              color="inherit"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component={MUILink}
              href="mailto:lc4490@nyu.edu"
              color="inherit"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Leo Chao · v2.0 ·{" "}
            <MUILink
              href="https://lc4490.github.io/home/"
              color="inherit"
              underline="always"
            >
              Previous website
            </MUILink>
          </Typography>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
