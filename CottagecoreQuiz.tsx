import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Download,
  Flower2,
  House,
  Leaf,
  RotateCcw,
  Sprout,
  Sun,
  Trees,
} from "lucide-react";

type PersonaKey = "meadow" | "hearth" | "forest" | "harvest";

type QuizOption = {
  text: string;
  persona: PersonaKey;
};

type QuizQuestion = {
  question: string;
  prompt: string;
  options: QuizOption[];
};

type Persona = {
  name: string;
  title: string;
  tagline: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
  softAccent: string;
  border: string;
  barColor: string;
  cardBackground: string;
  cardAccent: string;
};

const questions: QuizQuestion[] = [
  {
    question: "Your perfect morning begins with...",
    prompt: "Pick the little ritual that calls to you most.",
    options: [
      { text: "Wildflowers gathered in a chipped glass jar", persona: "meadow" },
      { text: "Bread warming in the oven and a slow cup of tea", persona: "hearth" },
      { text: "A quiet walk under mossy, misty trees", persona: "forest" },
      { text: "Sunlight in the garden with soil on my hands", persona: "harvest" },
    ],
  },
  {
    question: "Choose a place to spend an afternoon.",
    prompt: "Your heart knows where to wander.",
    options: [
      { text: "A picnic blanket in a field of buttercups", persona: "meadow" },
      { text: "A window seat with a quilt and a novel", persona: "hearth" },
      { text: "A hidden trail beside an old stone wall", persona: "forest" },
      { text: "A busy orchard in the late summer sun", persona: "harvest" },
    ],
  },
  {
    question: "Which small treasure would you keep?",
    prompt: "The things we gather say so much about us.",
    options: [
      { text: "A pressed flower tucked inside a letter", persona: "meadow" },
      { text: "A hand-thrown mug made just for sharing", persona: "hearth" },
      { text: "A faded map found in an antique shop", persona: "forest" },
      { text: "A basket brimming with ripe plums", persona: "harvest" },
    ],
  },
  {
    question: "What is your cottage soundtrack?",
    prompt: "Listen for the sound that feels like home.",
    options: [
      { text: "Bees humming and linen fluttering on the line", persona: "meadow" },
      { text: "Rain tapping softly against the kitchen window", persona: "hearth" },
      { text: "Leaves whispering in a deep green canopy", persona: "forest" },
      { text: "Crickets singing beneath a warm peach sky", persona: "harvest" },
    ],
  },
  {
    question: "Your friends know you for...",
    prompt: "Choose the kindness you give without thinking.",
    options: [
      { text: "Finding beauty in every ordinary day", persona: "meadow" },
      { text: "Making everyone feel safe and cared for", persona: "hearth" },
      { text: "Remembering stories and noticing quiet details", persona: "forest" },
      { text: "Bringing people together with joyful abundance", persona: "harvest" },
    ],
  },
];

const homeQuestions: QuizQuestion[] = [
  {
    question: "Which room would you make your favorite?",
    prompt: "Choose the space where your homebody heart feels most at ease.",
    options: [
      { text: "A bright conservatory overflowing with flowers", persona: "meadow" },
      { text: "A snug kitchen with a well-loved table", persona: "hearth" },
      { text: "A book-lined study with a view of the woods", persona: "forest" },
      { text: "A sunny dining room made for long feasts", persona: "harvest" },
    ],
  },
  {
    question: "Which texture belongs in your home?",
    prompt: "Let your hands choose the feeling that welcomes you in.",
    options: [
      { text: "Crisp linen embroidered with tiny petals", persona: "meadow" },
      { text: "Chunky wool and a patchwork quilt", persona: "hearth" },
      { text: "Weathered wood and soft mossy velvet", persona: "forest" },
      { text: "Sun-warmed cotton and woven baskets", persona: "harvest" },
    ],
  },
  {
    question: "Describe your ideal kitchen.",
    prompt: "The heart of the home has many lovely shapes.",
    options: [
      { text: "Open shelves with jars of dried blossoms", persona: "meadow" },
      { text: "A glowing range and a table for baking together", persona: "hearth" },
      { text: "Copper pots, herbs, and a quiet old pantry", persona: "forest" },
      { text: "A generous island ready for the harvest feast", persona: "harvest" },
    ],
  },
  {
    question: "What would you love to see from your window?",
    prompt: "Picture the view that would make you linger awhile.",
    options: [
      { text: "A meadow shimmering with dancing butterflies", persona: "meadow" },
      { text: "A cottage garden beside a steaming teacup", persona: "hearth" },
      { text: "Ancient trees fading into morning mist", persona: "forest" },
      { text: "Rolling fields glowing gold at sunset", persona: "harvest" },
    ],
  },
  {
    question: "How does your perfect evening end?",
    prompt: "Choose the ritual that makes the day feel complete.",
    options: [
      { text: "Arranging fresh flowers beside a candle", persona: "meadow" },
      { text: "Tucking in with tea and a favorite blanket", persona: "hearth" },
      { text: "Writing in a journal while the fire crackles", persona: "forest" },
      { text: "Sharing dessert beneath a string of garden lights", persona: "harvest" },
    ],
  },
];

const shuffleQuestions = (questionSet: QuizQuestion[]) =>
  questionSet.map((question) => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5),
  }));

const personas: Record<PersonaKey, Persona> = {
  meadow: {
    name: "Meadow Dreamer",
    title: "Soft-hearted & sunlit",
    tagline: "You find magic in the gentle, growing things.",
    description:
      "You move through the world with an open heart and an eye for tiny wonders. Your lightness makes ordinary moments feel beautifully alive.",
    icon: Flower2,
    accent: "text-rose-600",
    softAccent: "bg-rose-100",
    border: "border-rose-200",
    barColor: "bg-rose-400",
    cardBackground: "#f9e2e6",
    cardAccent: "#be6c7a",
  },
  hearth: {
    name: "Hearth Keeper",
    title: "Cozy soul & steady flame",
    tagline: "You turn every room into a welcome home.",
    description:
      "Warmth is your superpower, whether it comes as a shared meal or a listening ear. You make a refuge out of the everyday and invite everyone in.",
    icon: House,
    accent: "text-amber-700",
    softAccent: "bg-amber-100",
    border: "border-amber-200",
    barColor: "bg-amber-500",
    cardBackground: "#f8e8bd",
    cardAccent: "#b77b27",
  },
  forest: {
    name: "Forest Wanderer",
    title: "Quiet spirit & old soul",
    tagline: "You follow the path where memory and mystery meet.",
    description:
      "You are drawn to hush, history, and the stories held in the landscape. Your thoughtful presence reminds people to slow down and look closer.",
    icon: Trees,
    accent: "text-emerald-700",
    softAccent: "bg-emerald-100",
    border: "border-emerald-200",
    barColor: "bg-emerald-500",
    cardBackground: "#dcebd7",
    cardAccent: "#5e8b62",
  },
  harvest: {
    name: "Golden Harvest",
    title: "Generous heart & golden glow",
    tagline: "You make life feel ripe with possibility.",
    description:
      "You bring energy, nourishment, and a sunny sense of celebration wherever you go. Like a full garden, you are happiest when there is something lovely to share.",
    icon: Sun,
    accent: "text-orange-600",
    softAccent: "bg-orange-100",
    border: "border-orange-200",
    barColor: "bg-orange-400",
    cardBackground: "#fbe4c7",
    cardAccent: "#d47d38",
  },
};

const optionIcons: Record<PersonaKey, ComponentType<{ className?: string }>> = {
  meadow: Flower2,
  hearth: House,
  forest: Leaf,
  harvest: Sprout,
};

type QuizTrack = "style" | "home";

function CottageScene({ bloomed }: { bloomed: number }) {
  const flowers = [
    { x: 36, y: 86, color: "#e8a0ad" },
    { x: 54, y: 78, color: "#f2bd6b" },
    { x: 176, y: 82, color: "#a9c98b" },
    { x: 196, y: 88, color: "#d79bb0" },
    { x: 218, y: 78, color: "#efb96b" },
  ];

  return (
    <svg viewBox="0 0 260 115" role="img" aria-label="A little cottage surrounded by a garden" className="mx-auto mb-5 h-28 w-full max-w-xs">
      <path d="M13 101h234" stroke="#b6a17f" strokeWidth="2" strokeLinecap="round" />
      <path d="M74 101V55l56-38 56 38v46Z" fill="#f8dfbd" stroke="#ad876c" strokeWidth="2" />
      <path d="m65 57 65-46 65 46-10 8-55-39-55 39Z" fill="#bb8176" stroke="#94665e" strokeWidth="2" />
      <path d="M117 101V72h26v29" fill="#9d7563" stroke="#805b50" strokeWidth="2" />
      <path d="M87 66h18V84H87zm49 0h18V84h-18z" fill="#b8d2ce" stroke="#805b50" strokeWidth="2" />
      <path d="M42 101c7-13 17-16 28-10M177 101c9-15 24-18 39-8" fill="none" stroke="#789365" strokeWidth="4" strokeLinecap="round" />
      <path d="M23 101c12-8 22-8 34 0m130 0c15-9 28-8 45 0" fill="none" stroke="#789365" strokeWidth="3" />
      {flowers.map((flower, index) => (
        <g key={flower.x} className={index < bloomed ? "scene-flower scene-flower-visible" : "scene-flower"} style={{ color: flower.color }}>
          <path d={`M${flower.x} 101v-13`} stroke="#789365" strokeWidth="2" />
          <circle cx={flower.x} cy={86} r="4" fill="currentColor" />
          <circle cx={flower.x - 4} cy={88} r="3" fill="currentColor" />
          <circle cx={flower.x + 4} cy={88} r="3" fill="currentColor" />
          <circle cx={flower.x} cy={90} r="2" fill="#e7bd63" />
        </g>
      ))}
    </svg>
  );
}

export default function CottagecoreQuiz() {
  const [activeTrack, setActiveTrack] = useState<QuizTrack | null>(null);
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(PersonaKey | null)[]>(
    Array(questions.length).fill(null),
  );
  const [isComplete, setIsComplete] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState<"next" | "previous">("next");
  const [showBlend, setShowBlend] = useState(false);
  const [poppedOption, setPoppedOption] = useState<string | null>(null);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultCanvas = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const question = activeQuestions[questionIndex];
  const selectedPersona = answers[questionIndex];
  const progress = ((questionIndex + 1) / activeQuestions.length) * 100;

  const result = useMemo(() => {
    const scores: Record<PersonaKey, number> = {
      meadow: 0,
      hearth: 0,
      forest: 0,
      harvest: 0,
    };

    answers.forEach((answer) => {
      if (answer) scores[answer] += 1;
    });

    const winner = (Object.keys(scores) as PersonaKey[]).reduce(
      (leader, persona) => (scores[persona] > scores[leader] ? persona : leader),
      "meadow",
    );
    const blend = (Object.keys(scores) as PersonaKey[]).map((persona) => ({
      persona,
      percentage: Math.round((scores[persona] / activeQuestions.length) * 100),
    })).sort((a, b) => b.percentage - a.percentage);
    const winningAnswer = activeQuestions
      .flatMap((currentQuestion, index) =>
        currentQuestion.options.filter((option) => answers[index] === winner),
      )
      .find(Boolean)?.text ?? "the little things";

    return { winner, blend, winningAnswer };
  }, [answers, activeQuestions]);

  useEffect(() => {
    if (!isComplete) {
      setShowBlend(false);
      return;
    }

    const frame = requestAnimationFrame(() => setShowBlend(true));
    return () => cancelAnimationFrame(frame);
  }, [isComplete]);

  useEffect(() => {
    const canvas = resultCanvas.current;
    if (!canvas || !isComplete) return;

    const persona = personas[result.winner];
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = persona.cardBackground;
    context.fillRect(0, 0, 1080, 1080);
    context.fillStyle = "rgba(255,255,255,0.45)";
    context.beginPath();
    context.arc(130, 140, 180, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = persona.cardAccent;
    context.font = "600 34px Quicksand, sans-serif";
    context.textAlign = "center";
    context.fillText("YOUR COTTAGECORE SPIRIT", 540, 190);
    context.font = "italic 600 86px 'Playfair Display', serif";
    context.fillStyle = "#3f3a35";
    context.fillText(persona.name, 540, 330);
    context.font = "180px sans-serif";
    context.fillStyle = persona.cardAccent;
    context.fillText(({ meadow: "✿", hearth: "⌂", forest: "♣", harvest: "☀" } as Record<PersonaKey, string>)[result.winner], 540, 570);
    context.font = "italic 34px 'Playfair Display', serif";
    context.fillStyle = "#635a50";
    context.fillText(persona.tagline, 540, 700);
    context.font = "600 24px Quicksand, sans-serif";
    context.fillStyle = "#85796c";
    context.fillText("cottagecore-quiz", 540, 985);
  }, [isComplete, result.winner]);

  useEffect(() => {
    const isPersonaKey = (value: string | null): value is PersonaKey =>
      value !== null && value in personas;
    const requestedPersona = new URLSearchParams(window.location.search).get("result");
    const metadataPersona = isPersonaKey(requestedPersona) ? personas[requestedPersona] : personas[result.winner];
    const resultTitle = `I'm a ${metadataPersona.name}! 🌿`;
    const title = isComplete ? resultTitle : "Cottagecore Quiz";
    const socialTitle = isPersonaKey(requestedPersona) ? resultTitle : title;
    const description = metadataPersona.tagline;
    document.title = title;

    const tags: Record<string, string> = {
      "og:title": socialTitle,
      "og:description": description,
      "og:image": `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="100%" height="100%" fill="${metadataPersona.cardBackground}"/><text x="540" y="440" text-anchor="middle" font-family="serif" font-size="84" font-style="italic" fill="#3f3a35">${metadataPersona.name}</text><text x="540" y="570" text-anchor="middle" font-size="150" fill="${metadataPersona.cardAccent}">✿</text><text x="540" y="970" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#85796c">cottagecore-quiz</text></svg>`)}`,
      "twitter:card": "summary_large_image",
    };

    Object.entries(tags).forEach(([property, content]) => {
      const attribute = property.startsWith("og:") ? "property" : "name";
      let tag = document.head.querySelector(`meta[${attribute}="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });
  }, [result.winner, isComplete]);

  const selectAnswer = (persona: PersonaKey) => {
    setAnswers((current) =>
      current.map((answer, index) => (index === questionIndex ? persona : answer)),
    );

    const optionKey = `${questionIndex}-${persona}`;
    if (popTimer.current) clearTimeout(popTimer.current);
    setPoppedOption(null);
    requestAnimationFrame(() => setPoppedOption(optionKey));
    popTimer.current = setTimeout(() => setPoppedOption(null), 180);
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("result", result.winner);
    window.history.replaceState({}, "", url);
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadResultCard = () => {
    const canvas = resultCanvas.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${result.winner}-cottagecore-result.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const nextQuestion = () => {
    if (!selectedPersona) return;
    if (questionIndex === activeQuestions.length - 1) {
      setIsComplete(true);
      return;
    }
    setNavigationDirection("next");
    setQuestionIndex((index) => index + 1);
  };

  const previousQuestion = () => {
    setNavigationDirection("previous");
    setQuestionIndex((index) => index - 1);
  };

  const startQuiz = (track: QuizTrack) => {
    const source = track === "home" ? homeQuestions : questions;
    const url = new URL(window.location.href);
    url.searchParams.delete("result");
    window.history.replaceState({}, "", url);
    setActiveTrack(track);
    setActiveQuestions(shuffleQuestions(source));
    setNavigationDirection("next");
    setQuestionIndex(0);
    setAnswers(Array(source.length).fill(null));
    setIsComplete(false);
  };

  const restart = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("result");
    window.history.replaceState({}, "", url);
    setActiveTrack(null);
    setActiveQuestions(shuffleQuestions(questions));
    setQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setIsComplete(false);
    setCopied(false);
  };

  if (!activeTrack) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf9f1] px-5 py-10 text-stone-700">
        <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-amber-100/80 blur-3xl" />
        <section className="relative w-full max-w-2xl rounded-2xl border border-white/80 bg-white/85 p-7 text-center shadow-[0_18px_55px_rgba(106,84,54,0.13)] backdrop-blur sm:p-10">
          <CottageScene bloomed={0} />
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">A little personality garden</p>
          <h1 className="font-[Playfair_Display] text-4xl font-semibold italic text-stone-800 sm:text-5xl">Which cottage are you dreaming of?</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-stone-500">Choose a path and answer five gentle questions to discover your cottagecore spirit.</p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <button onClick={() => startQuiz("style")} className="min-h-11 min-w-11 rounded-2xl border border-rose-200 bg-rose-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-rose-100">
              <Flower2 className="mb-3 h-6 w-6 text-rose-500" />
              <span className="block font-[Playfair_Display] text-xl italic text-stone-800">Cottage core style</span>
              <span className="mt-1 block text-sm leading-5 text-stone-500">Discover the aesthetic and little rituals that feel most like you.</span>
            </button>
            <button onClick={() => startQuiz("home")} className="min-h-11 min-w-11 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-amber-100">
              <House className="mb-3 h-6 w-6 text-amber-600" />
              <span className="block font-[Playfair_Display] text-xl italic text-stone-800">Cottage home</span>
              <span className="mt-1 block text-sm leading-5 text-stone-500">Imagine the rooms, textures, and views that make a home bloom.</span>
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (isComplete) {
    const persona = personas[result.winner];
    const Icon = persona.icon;

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf9f1] px-5 py-12 text-stone-700">
        <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-amber-100/80 blur-3xl" />
        <canvas ref={resultCanvas} width={1080} height={1080} aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-px w-px" />
        <section className="result-enter relative w-full max-w-xl rounded-2xl border border-white/80 bg-white/85 p-7 text-center shadow-[0_18px_55px_rgba(106,84,54,0.13)] backdrop-blur sm:p-10">
          <CottageScene bloomed={5} />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Your cottagecore spirit</p>
          <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${persona.softAccent}`}>
            <Icon className={`h-10 w-10 ${persona.accent}`} />
          </div>
          <h1 className="font-[Playfair_Display] text-4xl font-semibold italic text-stone-800 sm:text-5xl">{persona.name}</h1>
          <p className={`mt-3 font-semibold ${persona.accent}`}>{persona.title}</p>
          <div className={`my-7 border-y ${persona.border} py-5`}>
            <p className="font-[Playfair_Display] text-xl italic leading-relaxed text-stone-700">“{persona.tagline}”</p>
          </div>
          <p className="mx-auto max-w-md text-base leading-7 text-stone-600">{persona.description}</p>
          <div className="mx-auto mt-8 max-w-md text-left">
            <h2 className="mb-4 font-[Playfair_Display] text-2xl font-semibold italic text-stone-800">Your Blend</h2>
            <div className="space-y-3">
              {result.blend.map(({ persona: personaKey, percentage }, index) => {
                const blendPersona = personas[personaKey];
                return (
                  <div key={personaKey}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs font-bold text-stone-600">
                      <span>{blendPersona.name}</span>
                      <span className={blendPersona.accent}>{percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className={`h-full rounded-full ${blendPersona.barColor} transition-[width] duration-1000 ease-out`}
                        style={{
                          width: showBlend ? `${percentage}%` : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-center font-[Playfair_Display] text-base italic text-stone-500">Your love of {result.winningAnswer.toLowerCase()} sealed it.</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={copyShareLink} className="min-h-11 min-w-11 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-200">
              <Copy className="h-4 w-4" />
              {copied ? "Link copied" : "Copy shareable link"}
            </button>
            <button onClick={downloadResultCard} className="min-h-11 min-w-11 inline-flex items-center gap-2 rounded-full bg-stone-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-4 focus:ring-stone-300">
              <Download className="h-4 w-4" />
              Download my result card
            </button>
          </div>
          <button onClick={restart} className="mt-4 min-h-11 min-w-11 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-stone-500 transition hover:text-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-200">
            <RotateCcw className="h-4 w-4" />
            Take the quiz again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf9f1] px-5 py-10 text-stone-700">
      <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-rose-100/70 blur-3xl" />
      <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-amber-100/80 blur-3xl" />
      <section className="relative w-full max-w-2xl rounded-2xl border border-white/80 bg-white/85 p-6 shadow-[0_18px_55px_rgba(106,84,54,0.13)] backdrop-blur sm:p-10">
        <CottageScene bloomed={answers.filter(Boolean).length} />
        <header className="mb-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">Question {questionIndex + 1} of {activeQuestions.length}</p>
            <Flower2 className="h-5 w-5 text-rose-400" />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div className="progress-fill h-full rounded-full bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div key={questionIndex} className={`step-enter-${navigationDirection} mb-8 text-center`}>
          <p className="mb-2 text-sm font-medium text-rose-400">A little moment for you</p>
          <h1 className="font-[Playfair_Display] text-3xl font-semibold italic leading-tight text-stone-800 sm:text-4xl">{question.question}</h1>
          <p className="mt-3 text-sm leading-6 text-stone-500">{question.prompt}</p>
        </div>

        <div key={`answers-${questionIndex}`} className={`step-enter-${navigationDirection} grid gap-3 sm:grid-cols-2`}>
          {question.options.map((option) => {
            const Icon = optionIcons[option.persona];
            const isSelected = selectedPersona === option.persona;
            const isPopped = poppedOption === `${questionIndex}-${option.persona}`;
            return (
              <button
                key={option.text}
                onClick={() => selectAnswer(option.persona)}
                className={`group flex min-h-28 min-w-11 items-start gap-3 rounded-2xl border p-4 text-left transition duration-200 focus:outline-none focus:ring-4 focus:ring-rose-100 ${isPopped ? "option-pop" : ""} ${isSelected ? "border-rose-300 bg-rose-50 shadow-[0_8px_20px_rgba(190,108,122,0.13)]" : "border-stone-100 bg-white hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md"}`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-rose-200 text-rose-700" : "bg-stone-100 text-stone-500 group-hover:bg-rose-100 group-hover:text-rose-600"}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="pt-1 text-sm font-bold leading-5 text-stone-700">{option.text}</span>
              </button>
            );
          })}
        </div>

        <footer className="mt-8 flex items-center justify-between gap-4 border-t border-stone-100 pt-6">
          <button onClick={previousQuestion} disabled={questionIndex === 0} className="min-h-11 min-w-11 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-bold text-stone-500 transition hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-35">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          <button onClick={nextQuestion} disabled={!selectedPersona} className="min-h-11 min-w-11 inline-flex items-center gap-1.5 rounded-full bg-stone-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-stone-700 focus:outline-none focus:ring-4 focus:ring-stone-300 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none">
            {questionIndex === questions.length - 1 ? "See my result" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </footer>
      </section>
    </main>
  );
}
