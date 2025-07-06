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
  Link,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";

// icon imports
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InfoIcon from "@mui/icons-material/Info";
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

// theme imports
import {
  createTheme,
  ThemeProvider,
  useTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

// slideshow imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// project/skills list
const projects = [
  {
    name: "trainerGPT",
    description:
      "All-encompassing trainer app. Utilizes OpenAI API to respond to user query. Identifies gym equipment through camera. Creates a exportable calendar of custom gym events. Identifies pantry items and generates custom recipes.",
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
      "Social media app. Ability to add friends, chat, voice and video call. AI chat moderation.",
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
    description:
      "Voice-responsive AI Chatbot. Utilizes OpenAI API to respond to user query. Multi-language support.",
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
      "An end-to-end pipeline for a customer churn prediction mode utilizing three different machine learning models deployed through Python and Streamlit",
    skills: ["Python", "Streamlit", "Pandas", "Numpy", "Machine Learning"],
    image: "/customerchurn.png",
    link: "https://leochao-customer-churn-prediction.streamlit.app",
  },
  {
    name: "AI_Trainer",
    description:
      "NextJS App with a chat interface and API endpoints to handle user queries and responses. Utilizes OpenAI API to respond to user query. Multi-language support.",
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
      "NextJS App that tracks pantry ingredients. Utilizes react-camera-pro and OpenAI API to identify images. Real-time creation of recipes using AI.",
    skills: ["Next.js", "React", "Firebase", "OpenAI", "JavaScript", "Node.js"],
    image: "/mypantry.png",
    link: "https://leonardochao-my-pantry.vercel.app",
  },
  {
    name: "lineup_Tracker",
    description:
      "Track NBA lineups. Scrapes data tables on websites. User input functionality. Real-time creation of subsets.",
    skills: ["Python", "BeautifulSoup", "Requests"],
    image: "/lineuptracker.png",
    link: "https://github.com/lc4490/lineupTracker/blob/main/README.md",
  },
  {
    name: "NBA Player Stat Analysis",
    description:
      "Fetch data from basketball-reference. User input functionality. Calculates Standard Deviation for a selected NBA player's statistics.",
    skills: ["Python", "Pandas", "Numpy"],
    image: "/statanalysis.png",
    link: "https://github.com/lc4490/findSTDev/blob/main/README.md",
  },
  {
    name: "Stocks = Steals + Blocks",
    description: "Parses on-device data-tables. Aggregates player statistics.",
    skills: ["Python", "Pandas", "Numpy"],
    image: "/stocks.png",
    link: "https://github.com/lc4490/stocks/blob/main/README.md",
  },
  {
    name: "MacroTracker",
    description:
      "Track macros. Manage recipes. Add ingredients. Calculate nutrition. Simple interface. Save & load data.",
    skills: ["Python", "tkinter"],
    image: "/macrotracker.png",
    link: "https://github.com/lc4490/macro-tracker/blob/master/README.md",
  },
  {
    name: "PyJack",
    description:
      "Python blackjack program. Two dealer algorithms. Saved user data. ASCII card art.",
    skills: ["Python"],
    image: "/pyjack.png",
    link: "https://github.com/lc4490/blackjack/blob/master/README.md",
  },
  {
    name: "Dandeflies",
    description:
      "Javascript P5 project. Combining dandelions and butterflies with P5 animation.",
    skills: ["JavaScript", "HTML", "CSS"],
    image: "/dandeflies.png",
    link: "https://lc4490.github.io/home/dandeflies/dandeflies.html",
  },
  {
    name: "Star_Carr",
    description:
      "Website built in HTML and CSS about the Star Carr archaelogical site.",
    skills: ["HTML", "CSS"],
    image: "/star_carr.png",
    link: "https://lc4490.github.io/star_carr/",
  },
  {
    name: "Erlitou",
    description:
      "Website built in HTML and CSS about the Erlitou archaelogical site.",
    skills: ["HTML", "CSS"],
    image: "/erlitou.png",
    link: "https://lc4490.github.io/erlitou/",
  },
  {
    name: "nyu_shell",
    description: "Linux shell clone built in C",
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
  { name: "Postman", icon: "./icons/postman.svg" },
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

// light/dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
      bubbles: "lightgray",
      userBubble: "#95EC69",
    },
    text: {
      default: "black",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "black",
      // default: '#232323',
      paper: "#121212",
      bubbles: "#2C2C2C",
      userBubble: "#29B560",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default function Home() {
  // toggle dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);
  const theme = darkMode ? darkTheme : lightTheme;

  // mobile drawer drop down menu
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  // arrows
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          zIndex: 1,
          left: "10px",
        }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          zIndex: 1,
          right: "10px",
        }}
        onClick={onClick}
      />
    );
  }
  // skill filter
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const handleSkillChange = (skill) => {
    const currentIndex = selectedSkills.indexOf(skill);
    const newSelectedSkills = [...selectedSkills];

    if (currentIndex === -1) {
      newSelectedSkills.push(skill);
    } else {
      newSelectedSkills.splice(currentIndex, 1);
    }

    setSelectedSkills(newSelectedSkills);
    filterProjects(newSelectedSkills);
  };

  const filterProjects = (skills) => {
    if (skills.length === 0) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        skills.some((skill) => project.skills.includes(skill))
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          width="100vw"
          // height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bgcolor="background.default"
          fontFamily="sans-serif"
        >
          {/* description modal */}
          <Modal open={openDesModal} onClose={() => setOpenDesModal(false)}>
            <Box
              overflow="auto"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                height: "75%",
                bgcolor: "background.default",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {/* image button */}
                <Button
                  href={projects[selectedProject]["link"]}
                  target="_blank"
                >
                  <Image
                    src={projects[selectedProject]["image"]}
                    alt="banner"
                    // layout="responsive"
                    width={"800"}
                    height={"400"}
                    style={{ width: "100%", height: "85%", objectFit: "cover" }}
                  ></Image>
                </Button>
              </Box>
              {/* name */}
              <Typography variant="h6" component="h2" fontWeight="600">
                {projects[selectedProject]["name"]}
              </Typography>
              {/* skills */}
              <Typography sx={{ mt: 2 }}>
                <strong>Skills:</strong>{" "}
                {projects[selectedProject]["skills"].join(", ")}
              </Typography>
              {/* description */}
              <Typography sx={{ mt: 2 }}>
                <strong>Description:</strong>{" "}
                {projects[selectedProject]["description"]}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenDesModal(false);
                }}
                sx={{
                  mt: 2,
                  backgroundColor: "text.primary",
                  color: "background.default",
                  borderColor: "text.primary",
                  "&:hover": {
                    backgroundColor: "darkgray",
                    color: "text.primary",
                    borderColor: "text.primary",
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
          {/* main box */}
          <Box id="home" width="100%" height="100%">
            {/* header */}
            <Box
              width="100%"
              height="12vh"
              bgcolor="background.default"
              // bgcolor="red"
              display="flex"
              flexDirection={"column"}
              justifyContent="space-between"
              paddingX={"1%"}
              alignItems="center"
              position="sticky"
              top="0" // Stick to the top of the viewport
              zIndex="1000"
            >
              {isMobile ? (
                <Box
                  width="100%"
                  height="100%"
                  paddingX={2.5}
                  flexDirection={"row"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  {/* Home */}
                  <Button
                    href="#home"
                    sx={{
                      backgroundColor: "background.default",
                      color: "text.primary",
                      borderColor: "background.default",
                      borderRadius: "10px",
                      fontWeight: "700",
                      "&:hover": {
                        backgroundColor: "text.primary",
                        color: "background.default",
                        borderColor: "text.primary",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "1.25rem",
                      }}
                    >
                      Home
                    </Typography>
                  </Button>
                  {/* drawer */}
                  <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  {/* drawer */}
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                  >
                    {/* Drawer items */}
                    <Box
                      width="300px"
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      paddingTop={2}
                    >
                      {/* LEO/Resume/Projects/Skills/Bio */}
                      <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="baseline"
                        gap={1.5}
                        paddingX={2}
                      >
                        {/* close Icon */}
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="end"
                          onClick={handleDrawerToggle}
                        >
                          <CloseIcon sx={{ fontSize: "1.5rem" }} />
                        </Box>
                        {/* Bio */}
                        <Button
                          href="#bio"
                          sx={{
                            fontSize: "1rem",
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "1.5rem",
                            }}
                          >
                            Bio
                          </Typography>
                        </Button>
                        {/* Skills */}
                        <Button
                          href="#skills"
                          sx={{
                            fontSize: "1rem",
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "1.5rem",
                            }}
                          >
                            Skills
                          </Typography>
                        </Button>
                        {/* Projects */}
                        <Button
                          href="#projects"
                          sx={{
                            fontSize: "1rem",
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "1.5rem",
                            }}
                          >
                            Projects
                          </Typography>
                        </Button>
                        {/* Resume */}
                        <Button
                          href="/Resume.pdf"
                          target="_blank"
                          sx={{
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "1.5rem",
                            }}
                          >
                            Resume
                          </Typography>
                        </Button>
                      </Box>
                      {/* github/linkedin */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {/* github */}
                        <Button
                          href="https://github.com/lc4490"
                          target="_blank"
                          sx={{
                            aspectRatio: 1,
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "50px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <GitHubIcon sx={{ fontSize: "2rem" }} />
                        </Button>
                        {/* linkedin */}
                        <Button
                          href="https://www.linkedin.com/in/leo-chao-0334602a6/"
                          target="_blank"
                          sx={{
                            aspectRatio: 1,
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "50px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <LinkedInIcon sx={{ fontSize: "2rem" }} />
                        </Button>
                        {/* email */}
                        <Button
                          href="mailto:lc4490@nyu.edu?..."
                          sx={{
                            aspectRatio: 1,
                            // backgroundColor: 'background.default',
                            color: "text.primary",
                            borderColor: "background.default",
                            borderRadius: "50px",
                            "&:hover": {
                              backgroundColor: "text.primary",
                              color: "background.default",
                              borderColor: "text.primary",
                            },
                          }}
                        >
                          <EmailIcon sx={{ fontSize: "2rem" }} />
                        </Button>
                      </Box>
                    </Box>
                  </Drawer>
                </Box>
              ) : (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent="space-between"
                  paddingX={2.5}
                >
                  {/* Home/Resume/Projects/Skills/Bio */}
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    {/* Home */}
                    <Button
                      href="#home"
                      sx={{
                        // width: "20%",
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "1.25rem",
                        }}
                      >
                        Home
                      </Typography>
                    </Button>
                    {/* Bio */}
                    <Button
                      href="#bio"
                      sx={{
                        // width: "20%",
                        fontSize: "1rem",
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "1.25rem",
                        }}
                      >
                        Bio
                      </Typography>
                    </Button>
                    {/* Skills */}
                    <Button
                      href="#skills"
                      sx={{
                        // width: "20%",
                        fontSize: "1rem",
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "1.25rem",
                        }}
                      >
                        Skills
                      </Typography>
                    </Button>
                    {/* Projects */}
                    <Button
                      href="#projects"
                      sx={{
                        // width: "20%",
                        fontSize: "1rem",
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "1.25rem",
                        }}
                      >
                        Projects
                      </Typography>
                    </Button>
                    {/* Resume */}
                    <Button
                      href="/Resume.pdf"
                      target="_blank"
                      sx={{
                        // width: "20%",
                        fontSize: "1rem",
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "1.25rem",
                        }}
                      >
                        Resume
                      </Typography>
                    </Button>
                  </Box>
                  <Box width="125%"></Box>
                  {/* github/linkedin */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    {/* github */}
                    <Button
                      href="https://github.com/lc4490"
                      target="_blank"
                      sx={{
                        aspectRatio: 1,
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <GitHubIcon sx={{ fontSize: "2rem" }} />
                    </Button>
                    {/* linkedin */}
                    <Button
                      href="https://www.linkedin.com/in/leo-chao-0334602a6/"
                      target="_blank"
                      sx={{
                        aspectRatio: 1,
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <LinkedInIcon sx={{ fontSize: "2rem" }} />
                    </Button>
                    {/* email */}
                    <Button
                      href="mailto:lc4490@nyu.edu?..."
                      sx={{
                        aspectRatio: 1,
                        backgroundColor: "background.default",
                        color: "text.primary",
                        borderColor: "background.default",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "text.primary",
                          color: "background.default",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      <EmailIcon sx={{ fontSize: "2rem" }} />
                    </Button>
                  </Box>
                </Box>
              )}
              <Divider
                sx={{
                  // bgcolor: 'rgba(0, 0, 0, 0.1)',  // Light black color
                  // height: 1,  // Divider height
                  display: "flex",
                  position: "relative",
                  justifyContent: "end",
                  alignItems: "end",
                  width: "100vw", // Full width
                }}
              />
            </Box>
            {/* Project slideshow */}
            <Box width="100%" backgroundColor="background.bubbles" paddingX={0}>
              <Slider {...settings}>
                {projects.slice(0, 5).map((project, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      height: isMobile ? "325px" : "500px",
                      // padding: 5,
                    }}
                  >
                    <Button
                      href={project.link}
                      target="_blank"
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        padding: 0,
                        justifyContent: "left",
                        alignItems: "baseline",
                        backgroundColor: "black",
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        layout="fill"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: "50%",
                        }}
                      />
                      <Stack
                        style={{
                          left: "5%",
                          width: isMobile ? "400px" : "500px",
                          height: "90%",
                          // backgroundColor: 'red',
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "end",
                          // alignItems: "end",
                          overflow: "hidden",
                          padding: 5,
                          position: "absolute",
                        }}
                      >
                        <Typography
                          variant={isMobile ? "h4" : "h3"}
                          color="white"
                          // textAlign="center"
                          fontWeight="700"
                          sx={
                            {
                              // WebkitTextStroke: '1px lightgray', // Stroke color and thickness
                            }
                          }
                        >
                          {project.name}
                        </Typography>
                        <Typography
                          variant="h8"
                          color="white"
                          sx={
                            {
                              // backgroundColor: "gray",
                              // WebkitTextStroke: '1px gray', // Stroke color and thickness
                            }
                          }
                          // textAlign="center"
                          // fontWeight="700"
                        >
                          {project.description}
                        </Typography>
                      </Stack>
                    </Button>
                  </Box>
                ))}
              </Slider>
            </Box>
            {/* Bio */}
            <Box id="bio" sx={{ height: 0 }}></Box>
            {/* <Typography id = "bio" paddingX={2.5} paddingY = {"1%"} variant="h4" color="text.primary" fontWeight="bold">Bio:</Typography> */}
            <Box
              sx={{
                // height: "60vh",
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Stack
                sx={{
                  width: isMobile ? "90%" : "75%",
                  // backgroundColor: "green",
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Image
                  src={"/pic00.jpg"}
                  alt="grad"
                  width="350"
                  height="350"
                ></Image>
                <Stack
                  sx={{
                    // backgroundColor: "blue",
                    width: "100%",
                    height: "300px",
                    justifyContent: "space-between",
                    padding: isMobile ? 0 : 5,
                    paddingY: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: isMobile ? "1.5rem" : "3rem",
                      fontWeight: "700",
                      color: "text.primary",
                      // fontSize: "2rem",
                    }}
                  >
                    Hi, my name is Leo Chao.
                  </Typography>
                  <Typography
                    variant="h7"
                    sx={{
                      // fontSize: "2rem",
                      color: "text.primary",
                    }}
                  >
                    I am a recent Computer Science and Data Science graduate
                    from NYU, with experience in web development, data analysis,
                    and project management, fluent in multiple programming
                    languages and passionate about leveraging technology to
                    solve real-world problems.
                  </Typography>
                  <Box>
                    <Button
                      href="/Resume.pdf"
                      target="_blank"
                      sx={{
                        display: "flex",
                        // justifyContent: "start",
                        border: "2.5px solid gray",
                        fontSize: "1.15rem",
                        fontWeight: "700",
                        color: "text.primary",
                        padding: 2,
                      }}
                    >
                      Click to see my Resume
                    </Button>
                  </Box>
                </Stack>

                {/* </Box> */}
              </Stack>
            </Box>
            <Box id="skills" sx={{ height: 50 }}></Box>
            {/* skills */}
            <Typography
              position="relative"
              paddingX={2.5}
              paddingY={"1%"}
              variant="h4"
              color="text.primary"
              fontWeight="bold"
            >
              Skills:
            </Typography>
            <Stack
              position="relative"
              paddingX={2.5}
              flexDirection="row"
              alignItems="center"
              style={{ maxWidth: "100%", overflow: "auto" }}
            >
              <FilterAltIcon sx={{ fontSize: "3rem" }}></FilterAltIcon>
              {skills.map(({ name, icon }, index) => (
                <Stack
                  item
                  xs={6}
                  sm={2}
                  key={index}
                  flexDirection={"row"}
                  padding={1}
                >
                  <IconButton
                    key={index}
                    onClick={() => handleSkillChange(name)}
                    sx={{
                      // width: "50px",
                      // aspectRatio: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedSkills.includes(name)
                        ? "text.primary"
                        : "background.bubbles",
                      color: selectedSkills.includes(name)
                        ? "background.default"
                        : "text.primary",
                      // border: "1px solid gray",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "text.primary",
                        color: "background.default",
                        borderColor: "text.primary",
                      },
                    }}
                  >
                    {/* <FontAwesomeIcon
                    icon={icon}
                    size="1x"
                  /> */}
                    <Typography
                      // variant='h8'
                      sx={{
                        padding: "5",
                        // width: "150px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        paddingX: 2.5,
                        fontWeight: "700",
                      }}
                    >
                      {name}
                    </Typography>
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <Box id="projects" sx={{ height: 50 }}></Box>
            {/* projects  */}
            <Typography
              paddingX={2.5}
              paddingY={"1%"}
              variant="h4"
              color="text.primary"
              fontWeight="bold"
            >
              Projects:
            </Typography>
            <Grid container spacing={"1%"} paddingX={2.5} paddingY={5}>
              {filteredProjects.map(
                ({ name, description, image, link }, index) => (
                  // projects grid
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={index}
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                  >
                    <Button
                      key={index}
                      href={link}
                      target="_blank"
                      sx={{
                        width: "100%",
                        aspectRatio: 16 / 9,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "background.default",
                        border: "1px solid background.default",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        src={image}
                        alt="temp"
                        width={200}
                        height={200}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                          opacity: "50%",
                        }}
                      />
                      {/* <Stack
                      style={{
                        flexGrow: 1,
                        textAlign: "center",
                        overflow: 'hidden',
                        padding: 5,
                        position: 'absolute',
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="white"
                        textAlign="center"
                        fontWeight="550"
                        >
                        {name}
                      </Typography>
                      
                  </Stack> */}
                    </Button>
                    <Button
                      onClick={() => handleDesModal(index)}
                      sx={{
                        // bgcolor: "text.primary",
                        color: "text.primary",
                        borderRadius: "25px",
                        // padding: '10px',
                        marginLeft: "25px",
                        fontWeight: "700",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "darkgray",
                          color: "text.primary",
                          borderColor: "text.primary",
                        },
                      }}
                    >
                      {/* {name} Bio */}
                      {name}
                      <InfoIcon />
                    </Button>
                  </Grid>
                )
              )}
            </Grid>
            {/* footer */}
            <Divider></Divider>
            <Box
              sx={{
                // backgroundColor:"red",
                width: "100%",
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  // backgroundColor: "green",
                  width: "50%",
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {/* github */}
                <Button
                  href="https://github.com/lc4490"
                  target="_blank"
                  sx={{
                    width: "65px",
                    height: "65px",
                    // aspectRatio: 1,
                    backgroundColor: "background.default",
                    color: "text.primary",
                    border: 1,
                    borderColor: "gray",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "text.primary",
                      color: "background.default",
                      borderColor: "text.primary",
                    },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: "2rem" }} />
                </Button>
                {/* linkedin */}
                <Button
                  href="https://www.linkedin.com/in/leo-chao-0334602a6/"
                  target="_blank"
                  sx={{
                    width: "65px",
                    height: "65px",
                    aspectRatio: 1,
                    backgroundColor: "background.default",
                    color: "text.primary",
                    border: 1,
                    borderColor: "gray",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "text.primary",
                      color: "background.default",
                      borderColor: "text.primary",
                    },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: "2rem" }} />
                </Button>
                {/* email */}
                <Button
                  href="mailto:lc4490@nyu.edu?..."
                  sx={{
                    width: "65px",
                    height: "65px",
                    aspectRatio: 1,
                    backgroundColor: "background.default",
                    color: "text.primary",
                    border: 1,
                    borderColor: "gray",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "text.primary",
                      color: "background.default",
                      borderColor: "text.primary",
                    },
                  }}
                >
                  <EmailIcon sx={{ fontSize: "2rem" }} />
                </Button>
              </Box>
              <Typography>
                © 2024 Leo Chao | v2.0 |{" "}
                <Link
                  href="https://lc4490.github.io/home/"
                  color="text.primary"
                >
                  Previous website
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
