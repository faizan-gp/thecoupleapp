import type { Locale } from "@/lib/i18n/locales";

/**
 * App catalog — the single source of truth for every app in the library.
 *
 * Adding a new app = one entry here + assets under /public/apps/<slug>/.
 * No layout code changes. Never rename a released slug (URLs are the contract);
 * if forced, add a redirect in next.config.ts.
 *
 * Read this file only through the accessors in lib/apps.ts so a future move to
 * a DB/CMS touches one file.
 */

/** English is mandatory; other locales fall back to it (with a build warning). */
export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

export type AppCategory =
  | "communication"
  | "planning"
  | "memories"
  | "finance"
  | "wellness"
  | "fun";

export type AppStatus = "released" | "coming-soon" | "beta";

/**
 * The parts of a relationship the library sets out to cover, in the order they
 * are presented. Every category has at most one app for now and most have none
 * — the landing page's library board reads this list to show which areas are
 * filled and which are still open.
 */
export const appCategories: AppCategory[] = [
  "communication",
  "planning",
  "memories",
  "finance",
  "wellness",
  "fun",
];

export type CoupleApp = {
  /** URL segment. Stable, English, lowercase-kebab. */
  slug: string;
  /** Brand name — not translated. */
  name: string;
  category: AppCategory;
  status: AppStatus;
  /** ISO date, set when released. */
  releaseDate?: string;
  /** Path under /public. */
  icon: string;
  screenshots: { src: string; width: number; height: number; alt: Localized<string> }[];
  stores: { appStore?: string; playStore?: string; web?: string };
  tagline: Localized<string>;
  /** 1–2 unique paragraphs per app — its long-tail SEO surface. */
  description: Localized<string>;
  features: Localized<{ title: string; body: string }[]>;
  faq?: Localized<{ q: string; a: string }[]>;
  seo: Localized<{ title: string; description: string; keywords?: string[] }>;
};

export const apps: CoupleApp[] = [
  {
    slug: "duet",
    name: "Duet",
    category: "communication",
    status: "released",
    releaseDate: "2026-06-01",
    icon: "/apps/duet/icon.svg",
    screenshots: [],
    stores: {
      appStore: "https://apps.apple.com/app/id0000000000",
      playStore: "https://play.google.com/store/apps/details?id=com.thecoupleapp.duet",
    },
    tagline: {
      en: "Daily questions that spark real conversations",
      es: "Preguntas diarias que despiertan conversaciones de verdad",
      fr: "Des questions quotidiennes qui lancent de vraies conversations",
      de: "Tägliche Fragen, die echte Gespräche anstoßen",
      pt: "Perguntas diárias que despertam conversas de verdade",
      hi: "रोज़ के सवाल जो सच्ची बातचीत शुरू करते हैं",
      ar: "أسئلة يومية تشعل محادثات حقيقية",
    },
    description: {
      en: "Duet gives you and your partner one thoughtful question every day — answer separately, then reveal together. No feeds, no scores, just a two-minute ritual that keeps you talking about things that matter.",
      es: "Duet os da a ti y a tu pareja una pregunta cuidada cada día: responded por separado y descubrid las respuestas juntos. Sin feeds ni puntuaciones, solo un ritual de dos minutos que os mantiene hablando de lo que importa.",
      fr: "Duet vous propose, à vous et votre partenaire, une question réfléchie chaque jour — répondez chacun de votre côté, puis découvrez vos réponses ensemble. Pas de fil d'actualité, pas de scores : un rituel de deux minutes qui vous fait parler de ce qui compte.",
      de: "Duet stellt euch jeden Tag eine durchdachte Frage — jeder antwortet für sich, dann deckt ihr die Antworten gemeinsam auf. Keine Feeds, keine Punktzahlen, nur ein Zwei-Minuten-Ritual, das euch über die wichtigen Dinge im Gespräch hält.",
      pt: "O Duet dá a você e ao seu par uma pergunta cuidadosa por dia — respondam separadamente e revelem juntos. Sem feeds, sem pontuações, apenas um ritual de dois minutos que mantém vocês conversando sobre o que importa.",
      hi: "Duet आपको और आपके साथी को हर दिन एक सोच-समझा सवाल देता है — अलग-अलग जवाब दें, फिर साथ में देखें। न कोई फ़ीड, न स्कोर — बस दो मिनट की आदत जो आपको ज़रूरी बातों पर बात करते रखती है।",
      ar: "يقدّم Duet لكما سؤالاً مدروساً كل يوم — أجيبا كلٌّ على حدة ثم اكشفا الإجابات معاً. لا خلاصات ولا نقاط، مجرد طقس من دقيقتين يبقيكما تتحدثان عمّا يهم.",
    },
    features: {
      en: [
        { title: "One question a day", body: "Curated prompts that go deeper than small talk." },
        { title: "Answer, then reveal", body: "You only see your partner's answer after writing your own." },
        { title: "Private by design", body: "Your answers stay between the two of you." },
      ],
      es: [
        { title: "Una pregunta al día", body: "Preguntas cuidadas que van más allá de la charla trivial." },
        { title: "Responde y descubre", body: "Solo ves la respuesta de tu pareja después de escribir la tuya." },
        { title: "Privado por diseño", body: "Vuestras respuestas quedan entre vosotros dos." },
      ],
      fr: [
        { title: "Une question par jour", body: "Des questions choisies qui vont plus loin que le bavardage." },
        { title: "Répondez, puis découvrez", body: "Vous ne voyez la réponse de votre partenaire qu'après avoir écrit la vôtre." },
        { title: "Privé par conception", body: "Vos réponses restent entre vous deux." },
      ],
      de: [
        { title: "Eine Frage pro Tag", body: "Kuratierte Impulse, die tiefer gehen als Smalltalk." },
        { title: "Antworten, dann aufdecken", body: "Die Antwort deines Partners siehst du erst nach deiner eigenen." },
        { title: "Privat by Design", body: "Eure Antworten bleiben unter euch." },
      ],
      pt: [
        { title: "Uma pergunta por dia", body: "Perguntas selecionadas que vão além da conversa fiada." },
        { title: "Responda e revele", body: "Você só vê a resposta do seu par depois de escrever a sua." },
        { title: "Privado por padrão", body: "As respostas ficam só entre vocês dois." },
      ],
      hi: [
        { title: "दिन में एक सवाल", body: "चुने हुए सवाल जो हल्की-फुल्की बातों से आगे जाते हैं।" },
        { title: "जवाब दें, फिर देखें", body: "साथी का जवाब आप अपना जवाब लिखने के बाद ही देखते हैं।" },
        { title: "पूरी तरह निजी", body: "आपके जवाब सिर्फ आप दोनों के बीच रहते हैं।" },
      ],
      ar: [
        { title: "سؤال واحد يومياً", body: "أسئلة منتقاة تتجاوز الأحاديث السطحية." },
        { title: "أجب ثم اكشف", body: "لا ترى إجابة شريكك إلا بعد كتابة إجابتك." },
        { title: "خصوصية في الصميم", body: "تبقى إجاباتكما بينكما فقط." },
      ],
    },
    faq: {
      en: [
        { q: "Is Duet free?", a: "Duet is free to download with an optional premium question library." },
        { q: "Do both partners need the app?", a: "Yes — each of you answers on your own device, then answers unlock for both." },
      ],
      es: [
        { q: "¿Duet es gratis?", a: "Duet es gratis, con una biblioteca premium de preguntas opcional." },
        { q: "¿Ambos necesitan la app?", a: "Sí: cada uno responde en su dispositivo y las respuestas se desbloquean para ambos." },
      ],
      fr: [
        { q: "Duet est-il gratuit ?", a: "Duet est gratuit, avec une bibliothèque de questions premium en option." },
        { q: "Les deux partenaires ont-ils besoin de l'application ?", a: "Oui — chacun répond sur son appareil, puis les réponses se déverrouillent pour les deux." },
      ],
      de: [
        { q: "Ist Duet kostenlos?", a: "Duet ist kostenlos, mit optionaler Premium-Fragenbibliothek." },
        { q: "Brauchen beide Partner die App?", a: "Ja — jeder antwortet auf dem eigenen Gerät, dann werden die Antworten für beide freigeschaltet." },
      ],
      pt: [
        { q: "O Duet é grátis?", a: "O Duet é grátis para baixar, com uma biblioteca premium de perguntas opcional." },
        { q: "Os dois precisam do app?", a: "Sim — cada um responde no próprio aparelho e as respostas são liberadas para ambos." },
      ],
      hi: [
        { q: "क्या Duet मुफ़्त है?", a: "Duet मुफ़्त है, साथ में वैकल्पिक प्रीमियम सवाल-लाइब्रेरी भी है।" },
        { q: "क्या दोनों साथियों को ऐप चाहिए?", a: "हाँ — दोनों अपने-अपने डिवाइस पर जवाब देते हैं, फिर जवाब दोनों के लिए खुलते हैं।" },
      ],
      ar: [
        { q: "هل Duet مجاني؟", a: "تنزيل Duet مجاني، مع مكتبة أسئلة مميزة اختيارية." },
        { q: "هل يحتاج الطرفان إلى التطبيق؟", a: "نعم — يجيب كل منكما على جهازه، ثم تُفتح الإجابات للطرفين." },
      ],
    },
    seo: {
      en: {
        title: "Duet — Daily conversation questions for couples",
        description: "Duet gives couples one thoughtful question a day. Answer separately, reveal together, and keep talking about what matters. Free on iOS and Android.",
        keywords: ["couples questions app", "daily questions for couples", "conversation app for couples"],
      },
      es: {
        title: "Duet — Preguntas diarias de conversación para parejas",
        description: "Duet da a las parejas una pregunta cuidada al día. Responded por separado, descubrid juntos y seguid hablando de lo que importa. Gratis en iOS y Android.",
      },
      fr: {
        title: "Duet — Questions quotidiennes pour les couples",
        description: "Duet propose aux couples une question réfléchie par jour. Répondez séparément, découvrez ensemble, et continuez à parler de ce qui compte. Gratuit sur iOS et Android.",
      },
      de: {
        title: "Duet — Tägliche Gesprächsfragen für Paare",
        description: "Duet stellt Paaren eine durchdachte Frage pro Tag. Getrennt antworten, gemeinsam aufdecken und über das Wichtige im Gespräch bleiben. Kostenlos für iOS und Android.",
      },
      pt: {
        title: "Duet — Perguntas diárias de conversa para casais",
        description: "O Duet dá aos casais uma pergunta cuidadosa por dia. Respondam separados, revelem juntos e continuem falando do que importa. Grátis no iOS e Android.",
      },
      hi: {
        title: "Duet — कपल्स के लिए रोज़ाना बातचीत के सवाल",
        description: "Duet कपल्स को हर दिन एक सोच-समझा सवाल देता है। अलग-अलग जवाब दें, साथ में देखें और ज़रूरी बातों पर बात करते रहें। iOS और Android पर मुफ़्त।",
      },
      ar: {
        title: "Duet — أسئلة محادثة يومية للأزواج",
        description: "يقدّم Duet للأزواج سؤالاً مدروساً كل يوم. أجيبا كلٌّ على حدة واكشفا الإجابات معاً وواصلا الحديث عمّا يهم. مجاني على iOS وAndroid.",
      },
    },
  },
  {
    slug: "nest",
    name: "Nest",
    category: "planning",
    status: "coming-soon",
    icon: "/apps/nest/icon.svg",
    screenshots: [],
    stores: {},
    tagline: {
      en: "Plan your life together, from date nights to big moves",
      es: "Planificad vuestra vida juntos, de las citas a las grandes decisiones",
      fr: "Planifiez votre vie à deux, des soirées aux grands projets",
      de: "Plant euer Leben zu zweit — vom Date-Abend bis zum großen Schritt",
      pt: "Planejem a vida juntos, do encontro à noite às grandes decisões",
      hi: "डेट नाइट से बड़े फ़ैसलों तक, साथ मिलकर ज़िंदगी की योजना बनाएं",
      ar: "خططا لحياتكما معاً، من سهرات المواعيد إلى الخطوات الكبيرة",
    },
    description: {
      en: "Nest is a shared planner built for two: date nights, trips, chores and the big milestones — all in one calendar you both actually check. Coming soon to iOS and Android.",
      es: "Nest es un planificador compartido hecho para dos: citas, viajes, tareas y los grandes hitos, todo en un calendario que ambos consultáis de verdad. Próximamente en iOS y Android.",
      fr: "Nest est un planificateur partagé conçu pour deux : sorties, voyages, tâches et grandes étapes — dans un seul calendrier que vous consultez vraiment. Bientôt sur iOS et Android.",
      de: "Nest ist ein gemeinsamer Planer für zwei: Date-Abende, Reisen, Aufgaben und die großen Meilensteine — in einem Kalender, den ihr beide wirklich nutzt. Bald für iOS und Android.",
      pt: "O Nest é um planejador compartilhado feito para dois: encontros, viagens, tarefas e os grandes marcos — em um calendário que vocês dois realmente consultam. Em breve no iOS e Android.",
      hi: "Nest दो लोगों के लिए बना साझा प्लानर है: डेट नाइट, यात्राएँ, काम और बड़े पड़ाव — एक ही कैलेंडर में जिसे आप दोनों वाकई देखते हैं। जल्द ही iOS और Android पर।",
      ar: "Nest مخطط مشترك مصمم لشخصين: سهرات المواعيد والرحلات والمهام والمحطات الكبيرة — في تقويم واحد تتابعانه فعلاً. قريباً على iOS وAndroid.",
    },
    features: {
      en: [
        { title: "One shared calendar", body: "Plans live in one place, synced for both of you." },
        { title: "Milestone timelines", body: "From moving in to the wedding — break big goals into steps." },
      ],
    },
    seo: {
      en: {
        title: "Nest — Shared planner for couples (coming soon)",
        description: "Nest is a shared calendar and planner for couples: date nights, trips, chores and milestones in one place. Coming soon to iOS and Android.",
        keywords: ["couples planner app", "shared calendar for couples"],
      },
      es: {
        title: "Nest — Planificador compartido para parejas (próximamente)",
        description: "Nest es un calendario y planificador compartido para parejas: citas, viajes, tareas e hitos en un solo lugar. Próximamente en iOS y Android.",
      },
      fr: {
        title: "Nest — Planificateur partagé pour les couples (bientôt)",
        description: "Nest est un calendrier et planificateur partagé pour les couples : sorties, voyages, tâches et grandes étapes au même endroit. Bientôt sur iOS et Android.",
      },
      de: {
        title: "Nest — Gemeinsamer Planer für Paare (demnächst)",
        description: "Nest ist ein gemeinsamer Kalender und Planer für Paare: Date-Abende, Reisen, Aufgaben und Meilensteine an einem Ort. Bald für iOS und Android.",
      },
      pt: {
        title: "Nest — Planejador compartilhado para casais (em breve)",
        description: "O Nest é um calendário e planejador compartilhado para casais: encontros, viagens, tarefas e marcos em um só lugar. Em breve no iOS e Android.",
      },
      hi: {
        title: "Nest — कपल्स के लिए साझा प्लानर (जल्द आ रहा है)",
        description: "Nest कपल्स के लिए साझा कैलेंडर और प्लानर है: डेट नाइट, यात्राएँ, काम और पड़ाव एक ही जगह। जल्द ही iOS और Android पर।",
      },
      ar: {
        title: "Nest — مخطط مشترك للأزواج (قريباً)",
        description: "Nest تقويم ومخطط مشترك للأزواج: المواعيد والرحلات والمهام والمحطات الكبيرة في مكان واحد. قريباً على iOS وAndroid.",
      },
    },
  },
];
