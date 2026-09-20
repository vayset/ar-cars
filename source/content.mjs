const company = {
  name: "A.R. Cars",
  owner: "Artur Avanesov",
  phone: "0472 97 45 37",
  tel: "+32472974537",
  email: "info@arcars.be",
  street: "Sint-Laurentiusstraat 64",
  postal: "9700",
  city: "Oudenaarde",
  vat: "BE0727.395.971",
  origin: "https://ar-cars-oudenaarde.fond-trail-0951.chatgpt.site",
  directions: "https://www.google.com/maps/dir/?api=1&destination=Sint-Laurentiusstraat+64+9700+Oudenaarde+Belgium"
};
const services = [
  {
    slug: "auto-onderhoud",
    title: "Auto-onderhoud",
    short: "Een goede basis voor elke kilometer.",
    image: "workshop",
    intro: "Regelmatig onderhoud helpt slijtage tijdig op te merken. Bij A.R. Cars in Oudenaarde bespreken we welke controles bij uw auto, kilometerstand en gebruik passen.",
    checks: [
      "Motorolie en filters volgens de voorschriften van de fabrikant",
      "Controle van vloeistoffen, banden en zichtbare slijtage",
      "Onderhoudsinterval en eerdere werkzaamheden bespreken"
    ],
    body: "Breng uw onderhoudsboekje of digitale onderhoudshistoriek mee. Het juiste interval hangt af van de motor, leeftijd en gebruiksomstandigheden. Korte ritten en veel stadsverkeer kunnen extra aandacht vragen. We bekijken wat nu nodig is en welke aandachtspunten u kunt opvolgen.",
    faq: [
      [
        "Hoe vaak heeft mijn auto onderhoud nodig?",
        "Volg het onderhoudsschema van de fabrikant en de melding in uw auto. Een vaste termijn is niet voor elke auto hetzelfde. Bel met uw model en kilometerstand voor overleg."
      ],
      [
        "Onderhouden jullie alle merken?",
        "De werkplaats verzorgt onderhoud en reparatie voor alle merken. Vraag bij het plannen naar de werkzaamheden voor uw specifieke model."
      ]
    ]
  },
  {
    slug: "auto-reparatie",
    title: "Mechanische reparaties",
    short: "Van een klein mankement tot een gerichte herstelling.",
    image: "repair",
    intro: "Een geluid, lekkage of veranderend rijgedrag verdient aandacht. We onderzoeken de klacht en bespreken de mogelijke herstelling voordat u een beslissing neemt.",
    checks: [
      "Uw klacht en het moment waarop ze optreedt in kaart brengen",
      "Gerichte inspectie van de betrokken onderdelen",
      "Werkzaamheden en kosten vooraf bespreken"
    ],
    body: "Beschrijf wanneer het probleem voorkomt: bij een koude motor, tijdens remmen, bij accelereren of op een bepaalde snelheid. Die informatie helpt om gericht te zoeken. Een reparatie begint met de oorzaak, want alleen een onderdeel vervangen lost niet elke storing op.",
    faq: [
      [
        "Kan ik zonder diagnose een prijs krijgen?",
        "Een betrouwbare prijs hangt af van de oorzaak en de benodigde onderdelen. We bespreken eerst de klacht en geven aan welk onderzoek nodig is."
      ],
      [
        "Mag ik met een vreemd geluid blijven rijden?",
        "Dat hangt af van de oorzaak. Bij sterke trillingen, vermogensverlies, een rood waarschuwingslampje of problemen met remmen: stop veilig en neem contact op."
      ]
    ]
  },
  {
    slug: "diagnose",
    title: "Computer- & motordiagnose",
    short: "Duidelijkheid achter het dashboardlampje.",
    image: "diagnostics",
    intro: "Brandt er een waarschuwingslampje of loopt de motor onregelmatig? Een diagnose helpt de storing gericht te onderzoeken. A.R. Cars leest de beschikbare foutinformatie uit en beoordeelt die samen met de symptomen.",
    checks: [
      "Foutcodes en beschikbare meetwaarden uitlezen",
      "Elektrische en mechanische oorzaken gericht controleren",
      "Uitleg over het resultaat en de volgende stap"
    ],
    body: "Een foutcode geeft een aanwijzing, geen definitieve diagnose. Een sensorcode kan bijvoorbeeld samenhangen met bedrading, een lekkage of een ander onderdeel. Daarom combineren we de computerinformatie met een inspectie. Vermeld eerdere reparaties en of de klacht voortdurend of af en toe optreedt.",
    faq: [
      [
        "Is een foutcode wissen voldoende?",
        "Nee. Wissen verhelpt de oorzaak niet. De melding kan terugkomen zolang het probleem blijft bestaan."
      ],
      [
        "Wat als het motorlampje knippert?",
        "Een knipperend lampje kan op een ernstige storing wijzen. Verminder belasting, stop op een veilige plek en vraag advies voordat u verder rijdt."
      ]
    ]
  },
  {
    slug: "remmen",
    title: "Remmen controleren & vervangen",
    short: "Vertrouwen bij elke stop.",
    image: "brakes",
    intro: "Piepende remmen, een trillend pedaal of een langere remweg? Laat het remsysteem controleren. Bij A.R. Cars in Oudenaarde kijken we naar de toestand van de onderdelen en het gedrag tijdens remmen.",
    checks: [
      "Remblokken en remschijven op slijtage beoordelen",
      "Remklauwen en zichtbare lekkages controleren",
      "Remvloeistof en vervangingsinterval bespreken"
    ],
    body: "Remslijtage verschilt sterk per rijstijl en gebruik. Een geluid betekent niet altijd dat blokken versleten zijn, maar aanhoudend schuren, trekken of een zacht pedaal verdient snel onderzoek. Bij duidelijk verlies van remwerking rijdt u niet verder: stop veilig en schakel hulp in.",
    faq: [
      [
        "Wanneer moeten mijn remblokken vervangen worden?",
        "De gemeten slijtage en de minimale dikte van de fabrikant bepalen dat. Er is geen universele kilometerstand voor vervanging."
      ],
      [
        "Waarom trilt mijn stuur bij remmen?",
        "Dat kan onder meer samenhangen met remschijven, banden of wielophanging. Een inspectie is nodig om de oorzaak vast te stellen."
      ]
    ]
  },
  {
    slug: "olie-en-filters",
    title: "Olie & filters",
    short: "De juiste olie, op het juiste moment.",
    image: "engine",
    intro: "Motorolie smeert en beschermt bewegende onderdelen. Verversen met de juiste specificatie en een passend filter is een belangrijk onderdeel van onderhoud.",
    checks: [
      "Olievoorschrift en vereiste hoeveelheid controleren",
      "Motorolie en oliefilter vervangen wanneer nodig",
      "Lucht- en interieurfilters beoordelen"
    ],
    body: "De viscositeit op de verpakking is niet het enige criterium: ook de goedkeuring van de fabrikant telt. Een oliepeilmelding is bovendien iets anders dan een oliedrukwaarschuwing. Bij een rode oliedrukmelding stopt u veilig en zet u de motor uit.",
    faq: [
      [
        "Kan ik zelf olie bijvullen?",
        "Raadpleeg het instructieboek voor de juiste olie en meetprocedure. Vul niet boven het maximum. Laat terugkerend olieverlies onderzoeken."
      ],
      [
        "Is alleen bijvullen genoeg?",
        "Bijvullen vervangt geen oliebeurt. Oude olie en een verzadigd filter blijven aanwezig totdat ze worden vervangen."
      ]
    ]
  },
  {
    slug: "batterij-en-startproblemen",
    title: "Batterij & startproblemen",
    short: "Op zoek naar de oorzaak van een moeilijke start.",
    image: "diagnostics",
    intro: "Start uw auto traag of helemaal niet? De batterij is een mogelijke oorzaak, maar ook het laadsysteem, de startmotor of een elektrische verbinding kan een rol spelen.",
    checks: [
      "Startgedrag en batterijconditie beoordelen",
      "Aansluitingen en laadsysteem controleren",
      "Een passende vervangingsbatterij bepalen"
    ],
    body: "Moderne auto\u2019s met start-stop gebruiken vaak een specifiek batterijtype. Na vervanging kan registratie in de auto nodig zijn. Beschrijf of u een klik hoort, of de motor ronddraait en of verlichting en dashboard nog werken. Dat helpt bij de eerste inschatting.",
    faq: [
      [
        "Is een lege batterij altijd versleten?",
        "Niet noodzakelijk. Lang stilstaan, korte ritten of een verbruiker kunnen de batterij ontladen. Testen helpt de oorzaak te onderscheiden."
      ],
      [
        "Kan ik zomaar startkabels gebruiken?",
        "Volg de handleiding van uw auto. Een verkeerde aansluiting kan schade veroorzaken. Vraag hulp als u twijfelt."
      ]
    ]
  },
  {
    slug: "banden-en-ophanging",
    title: "Banden, wielen & ophanging",
    short: "Grip, stabiliteit en rijcomfort.",
    image: "wheels",
    intro: "Trillingen, ongelijkmatige bandenslijtage of een bonkend geluid kunnen verschillende oorzaken hebben. Laat de banden en zichtbare delen van de ophanging nakijken.",
    checks: [
      "Bandenspanning, profiel en beschadigingen controleren",
      "Wielen en wielbevestiging beoordelen",
      "Ophanging op zichtbare slijtage en speling onderzoeken"
    ],
    body: "Een trilling op een bepaalde snelheid kan van een wiel komen, maar is op afstand niet betrouwbaar te diagnosticeren. Vermeld of u de trilling in het stuur, de stoel of het rempedaal voelt. Neem bij een beschadigde band of plotselinge instabiliteit geen risico.",
    faq: [
      [
        "Waarom slijt \xE9\xE9n kant van mijn band sneller?",
        "Bandenspanning, wielstand en ophangingsslijtage kunnen meespelen. Een controle maakt duidelijk welk vervolgonderzoek nodig is."
      ],
      [
        "Welke bandenservice is mogelijk voor mijn auto?",
        "Bel met uw bandenmaat en gewenste werkzaamheden. Zo kunnen we de mogelijkheden en planning voor uw auto bespreken."
      ]
    ]
  },
  {
    slug: "keuring-voorbereiden",
    title: "Controle v\xF3\xF3r de keuring",
    short: "Met inzicht naar de technische keuring.",
    image: "workshop",
    intro: "Een controle vooraf kan zichtbare aandachtspunten aan het licht brengen. A.R. Cars helpt u om verlichting, banden en andere relevante onderdelen te laten nakijken v\xF3\xF3r uw afspraak bij het keuringsstation.",
    checks: [
      "Verlichting, ruitenwissers en banden nakijken",
      "Zichtbare lekkages en slijtage bespreken",
      "Bestaande keuringsopmerkingen doornemen"
    ],
    body: "Neem een eerder keuringsbewijs mee als er opmerkingen op staan. Een voorbereiding is geen offici\xEBle keuring en biedt geen garantie op goedkeuring. Het erkende keuringsstation beoordeelt het voertuig volgens de toepasselijke eisen.",
    faq: [
      [
        "Doet A.R. Cars de offici\xEBle keuring?",
        "De offici\xEBle technische keuring gebeurt in een erkend keuringsstation. Wij kunnen vooraf controles en afgesproken herstellingen uitvoeren."
      ],
      [
        "Wanneer plan ik de controle?",
        "Neem tijdig contact op, zodat er ruimte is voor eventuele herstellingen v\xF3\xF3r uw keuringsdatum."
      ]
    ]
  }
];
const articles = [
  {
    slug: "motorlampje-brandt",
    title: "Waarom brandt mijn motorlampje?",
    category: "DASHBOARD",
    service: "diagnose",
    image: "diagnostics",
    answer: "Een motorlampje betekent dat het motormanagement een afwijking heeft geregistreerd. De oorzaak kan elektrisch, mechanisch of emissiegerelateerd zijn. Alleen uitlezen \xE9n gericht controleren kan duidelijkheid geven.",
    steps: [
      "Noteer of het lampje continu brandt of knippert en of de auto anders rijdt.",
      "Bij een knipperend lampje, onregelmatige loop of vermogensverlies: stop veilig en vraag hulp.",
      "Laat de foutinformatie controleren; het lampje wissen is geen reparatie."
    ]
  },
  {
    slug: "motor-tikt",
    title: "Waarom maakt mijn motor een tikkend geluid?",
    category: "MOTOR",
    service: "auto-reparatie",
    image: "engine",
    answer: "Een tikkend geluid kan onder meer samenhangen met injectoren, klepbediening of smering. Sommige werkingsgeluiden zijn normaal, maar een nieuw of toenemend geluid vraagt onderzoek.",
    steps: [
      "Noteer of het geluid bij koude of warme motor optreedt.",
      "Controleer het oliepeil alleen zoals beschreven in de handleiding.",
      "Bij een rode oliedrukmelding, harde klop of vermogensverlies: motor uit en hulp inschakelen."
    ]
  },
  {
    slug: "vreemd-geluid-auto",
    title: "Mijn auto maakt een vreemd geluid. Wat nu?",
    category: "REPARATIE",
    service: "auto-reparatie",
    image: "repair",
    answer: "Het moment waarop een geluid optreedt helpt bij de diagnose. Geluid tijdens remmen wijst naar andere onderdelen dan geluid bij sturen of accelereren. Op afstand is de oorzaak niet zeker vast te stellen.",
    steps: [
      "Beschrijf het geluid en wanneer het begint.",
      "Maak alleen een opname als dat veilig kan, nooit met een telefoon in de hand tijdens het rijden.",
      "Laat nieuwe, aanhoudende of snel erger wordende geluiden controleren."
    ]
  },
  {
    slug: "auto-trilt",
    title: "Waarom trilt mijn auto of stuur?",
    category: "BANDEN & OPHANGING",
    service: "banden-en-ophanging",
    image: "wheels",
    answer: "Trillingen kunnen ontstaan door banden, wielen, remmen of onderdelen van de ophanging. Snelheid, remmen en accelereren hebben invloed en helpen om het probleem te lokaliseren.",
    steps: [
      "Noteer bij welke snelheid de trilling optreedt.",
      "Controleer bij stilstand of een band zichtbaar beschadigd is.",
      "Bij plotselinge sterke trillingen: vertraag rustig, stop veilig en laat de auto nakijken."
    ]
  },
  {
    slug: "remmen-piepen",
    title: "Waarom piepen mijn remmen?",
    category: "REMMEN",
    service: "remmen",
    image: "brakes",
    answer: "Vocht, vuil, materiaal en slijtage kunnen remgeluid veroorzaken. Piepende remmen zijn niet automatisch versleten, maar blijvend geluid moet beoordeeld worden.",
    steps: [
      "Let op of het geluid na enkele remacties verdwijnt of juist aanhoudt.",
      "Schurend metaalgeluid of veranderde remwerking vraagt snelle controle.",
      "Rijd niet verder als de remwerking duidelijk vermindert."
    ]
  },
  {
    slug: "auto-start-niet",
    title: "Waarom start mijn auto niet?",
    category: "BATTERIJ",
    service: "batterij-en-startproblemen",
    image: "diagnostics",
    answer: "Een lege batterij is een veelvoorkomende mogelijkheid, maar de startmotor, startblokkering of brandstoftoevoer kan eveneens een rol spelen. Wat u hoort en ziet tijdens starten is belangrijke informatie.",
    steps: [
      "Noteer of de motor ronddraait, klikt of helemaal niet reageert.",
      "Vermijd herhaald lang starten.",
      "Bel met uw model, symptomen en locatie om de volgende stap te bespreken."
    ]
  },
  {
    slug: "motor-oververhit",
    title: "Wat moet ik doen als mijn motor oververhit?",
    category: "MOTOR",
    service: "auto-reparatie",
    image: "engine",
    answer: "Stop zo snel mogelijk op een veilige plek en zet de motor uit bij een rode temperatuurwaarschuwing of stoom. Verder rijden kan ernstige schade veroorzaken.",
    steps: [
      "Laat de motor afkoelen en blijf uit de buurt van hete vloeistof.",
      "Open nooit de dop van het koelsysteem wanneer de motor heet is.",
      "Schakel hulp in en laat de oorzaak onderzoeken voordat u verder rijdt."
    ]
  },
  {
    slug: "wanneer-onderhoud",
    title: "Hoe vaak heeft mijn auto onderhoud nodig?",
    category: "ONDERHOUD",
    service: "auto-onderhoud",
    image: "workshop",
    answer: "Het juiste interval staat in het onderhoudsschema van de fabrikant. Zowel tijd als kilometerstand tellen mee. Uw rijomstandigheden kunnen aanleiding geven tot extra controles.",
    steps: [
      "Controleer uw onderhoudsboekje en dashboardmelding.",
      "Houd rekening met korte ritten, veel stilstand of intensief gebruik.",
      "Breng uw onderhoudshistoriek mee naar de afspraak."
    ]
  }
];
const commonFaq = [
  [
    "Voor welke merken kan ik terecht?",
    "A.R. Cars verzorgt onderhoud en reparatie voor alle merken. Geef uw merk, model en bouwjaar door, zodat we uw vraag gericht kunnen bespreken."
  ],
  [
    "Hoe maak ik een afspraak?",
    "Bel 0472 97 45 37 of vul het contactformulier in. Een aanvraag is pas een afspraak nadat de garage de datum en werkzaamheden heeft bevestigd."
  ],
  [
    "Waar ligt de garage?",
    "U vindt A.R. Cars aan de Sint-Laurentiusstraat 64, 9700 Oudenaarde. Gebruik de routeknop op de contactpagina voor uw route."
  ],
  [
    "Wat zijn de openingsuren?",
    "Bel de garage voor de actuele openingsuren en beschikbaarheid. Zo voorkomt u een vergeefse verplaatsing."
  ],
  [
    "Kan ik een auto komen bekijken?",
    "Neem vooraf contact op over de betreffende auto en een geschikt bezoekmoment. Voertuigen met het label Demo zijn fictieve voorbeelden en niet te koop."
  ]
];
export {
  articles,
  commonFaq,
  company,
  services
};
