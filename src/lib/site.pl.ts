/*
  Polish translation of site.en.ts — same shape, same images/ids/colors/
  hrefs/numbers, only the prose is translated. First draft (machine
  translation reviewed for basic fluency, not proofread by a native
  speaker for this specific context) — meant to be corrected in place.
*/
import type {
  Guide,
  GuideBlock,
  Hotel,
  JourneyPhase,
  Day,
  DayHeader,
  Fit,
  Occasion,
} from "./site.en";

export const couple = {
  names: "Anna & Shib",
  place: "Sambalpur, Indie",
  dates: "17–20.12.2026",
};

export const invitation =
  "Drogi Gościu, bierzemy ślub w świętej hinduskiej ceremonii 20 grudnia 2026 roku, a poprzedzą ją uroczystości 18 i 19 grudnia. Serdecznie zapraszamy Cię, żebyś dołączył do nas w tej przygodzie.";

export const story =
  "7 lat, 3 kraje, 2 kultury i niezliczone elementy, które odnalazły wspólną drogę.";

export const storyNote = "Trochę też po to, żeby uszczęśliwić wujka Sahoo.";

export const anniversaryNote =
  "Jeśli nie możesz przyjechać w tym roku, zarezerwuj termin — 30.12.2027 — na naszą pierwszą rocznicę na Sri Lance.";

export const preparation = {
  visa: {
    body: "Większość gości będzie potrzebować indyjskiej e-wizy turystycznej. Złóż wniosek zaraz po rezerwacji lotów — zatwierdzenie trwa zwykle około tygodnia, ale na wszelki wypadek złóż go z miesięcznym wyprzedzeniem. Bliżej terminu wyślemy szczegółowe instrukcje.",
    cost: "35 USD",
    link: "https://indianvisaonline.gov.in/evisa/Registration",
    linkLabel: "Złóż wniosek o e-wizę",
  },
  insurance:
    "Zalecamy wykupienie ubezpieczenia podróżnego — sprawdź, czy Twoja karta kredytowa nie obejmuje go już automatycznie. Warto rozważyć wyrobienie karty kredytowej wyższego poziomu, tak na wszelki wypadek. Sprawdź też, czy w ramach benefitów masz dostęp do saloników lotniskowych — może się przydać.",
  vaccine:
    "Dla podróżnych z Europy żadne szczepienie nie jest obowiązkowe, jednak wjeżdżasz na obszar zagrożony malarią. Niektóre szczepionki wymagają kilku dawek, więc dobrze zacząć przygotowania wcześniej.",
  medication:
    "Zabierz ze sobą wystarczającą ilość leków na receptę na cały wyjazd plus kilka dni zapasu, w oryginalnym, opisanym opakowaniu, w bagażu podręcznym. Zapytaj lekarza o profilaktykę przeciwmalaryczną przed wyjazdem. Mała apteczka podróżna — coś na rozstrój żołądka, leki przeciwbólowe i elektrolity — pokrywa większość realnych potrzeb.",
  flights: {
    body: "Loty z Europy kosztują zwykle 7 000–9 000 NOK. LOT jest najtańszy; Lufthansa lub Finnair oferują lepszy standard — polecamy Lufthansę. Zarezerwuj lot międzynarodowy do Delhi lub Mumbaju, a potem krótki lot krajowy do Jharsugudy. Lot krajowy po Indiach polecamy kupować przez Kiwi lub inną porównywarkę.",
    example: "np. Lufthansa Frankfurt–Delhi, a potem IndiGo Delhi–Jharsuguda.",
  },
  payments:
    "Karty są powszechnie akceptowane w hotelach, restauracjach i sklepach w miastach, ale warto mieć trochę gotówki na drobnych sprzedawców, targi i napiwki — Sambalpur nie jest tak przyjazny kartom jak Delhi czy Mumbaj. UPI (dominujący w Indiach system płatności) wymaga indyjskiego konta bankowego, więc większość gości z niego nie skorzysta. Poinformuj bank o podróży, żeby karta nie została zablokowana, i spodziewaj się opłaty za transakcję zagraniczną, chyba że Twoja karta jej nie pobiera.",
  esim:
    "Kup e-SIM zanim wylecisz — aplikacje takie jak Airalo czy Holafly pozwalają kupić pakiet danych do Indii i aktywować go od razu po lądowaniu, bez wymiany fizycznej karty SIM. Zostaw aktywną kartę domową (choćby tylko do odbierania SMS-ów), żeby móc nadal odbierać kody OTP do bankowości i 2FA. Lokalna fizyczna karta SIM to alternatywa, ale wymaga dokumentu tożsamości i zajmuje więcej czasu.",
  packing:
    "Lekkie, przewiewne tkaniny — spodziewaj się około 30°C. Szczegóły strojów na każdą okazję znajdziesz w sekcji „Co na siebie”.",
  gift: "Tylko Wasze błogosławieństwo i list.",
  mentalPrep:
    "Sambalpur nie jest miejscowością turystyczną — to prawdziwe, lokalne, pracujące miasto, a nie wypolerowana pocztówka. Przed wyjazdem zajrzyj na Google Maps i przejdź się po nim w Street View. Zobaczenie ulic, ruchu i tempa życia z wyprzedzeniem sprawia, że to część przygody, a nie zaskoczenie.",
};

export const hotels: Hotel[] = [
  {
    name: "Grand Siba Hotel",
    dates: "17–19 grudnia",
    link: "https://www.tripadvisor.in/Hotel_Review-g1213781-d12335313-Reviews-Hotel_The_Grand_Siba-Sambalpur_Sambalpur_District_Odisha.html",
  },
  {
    name: "The Royal Retreat",
    dates: "20 grudnia · miejsce ślubu",
    link: "https://royalretreathotel.com",
  },
];

const notWrittenYet = "Ten przewodnik nie został jeszcze napisany — zajrzyj bliżej terminu.";

export const guides: Guide[] = [
  { title: "Hotele", image: "/figma/guides/hotels.png", body: notWrittenYet },
  { title: "Lot", image: "/figma/guides/flight.png", body: notWrittenYet },
  { title: "Wydarzenia", image: "/figma/guides/events.png", body: notWrittenYet },
  {
    title: "Życie na ulicy",
    image: "/figma/guides/street-life.png",
    body: [
      { kind: "heading", text: "Jak cieszyć się Indiami" },
      {
        kind: "p",
        text: "Indie potrafią być niesamowicie gościnne, hojne i chaotyczne jednocześnie. Dla kogoś z Europy zupełnie zwyczajne indyjskie interakcje mogą początkowo wydawać się dziwne: ktoś może zaproponować, że poniesie Twoją torbę, pomoże przy bankomacie, załatwi taksówkę, pokaże drogę, poleci sklep, zapyta skąd jesteś, poprosi o zdjęcie albo zaoferuje „pomoc” przy czymś, z czym wcale nie miałeś problemu. Niektórzy robią to z prawdziwą intensywnością — patrzę na Ciebie, Nowe Delhi — a nachalne techniki sprzedaży w miejscach turystycznych irytują większość ludzi, nie tylko turystów.",
      },
      {
        kind: "p",
        text: "To automatycznie nie oznacza, że coś jest nie tak. Indie mają dużo bardziej bezpośrednią, zorientowaną na obsługę kulturę niż większość Europy, a niektórzy ludzie utrzymują się z drobnych usług, prowizji i napiwków, do których możesz nie być przyzwyczajony/a. Sztuka polega na odróżnieniu „ktoś jest pomocny” od „właśnie zgodziłem/łam się na usługę, za którą teraz muszę zapłacić”.",
      },
      {
        kind: "p",
        text: "Możesz odmówić. Możesz też zapytać „Czy to jest płatne?”, zanim cokolwiek przyjmiesz — jedno zdanie, które oszczędza mnóstwo niezręczności. Stanowcze „nie, dziękuję” (uniesiona dłoń też działa) w zupełności wystarczy. Im bardziej łagodna osoba na co dzień, tym bardziej wyrazista musi być ta odmowa.",
      },
      { kind: "heading", text: "Najważniejsza zasada dotycząca pieniędzy" },
      { kind: "p", text: "Jeśli nie umówiłeś/aś się na zapłatę za coś, nie zakładaj, że musisz płacić. Ma to największe znaczenie przy wycieczkach." },
      {
        kind: "p",
        text: "Załóżmy, że rezerwujesz online jednodniową wycieczkę Delhi → Agra i płacisz z góry za cały pakiet. Może on obejmować prywatny samochód, kierowcę, przewodnika, odbiór z hotelu, bilety wstępu, lunch, parking i opłaty drogowe — ale niekoniecznie napiwki. To, że pakiet jest przedpłacony, nie oznacza, że każda zaangażowana osoba dostała napiwek. A słowa przewodnika „napiwek jest zwyczajowy” nie oznaczają, że nagle pojawiła się obowiązkowa dodatkowa opłata.",
      },
      {
        kind: "p",
        text: "Czasem pojawia się nowa osoba, nagle „zaangażowana” w Twoją wycieczkę i oczekująca zapłaty. Zapytaj „Kim jest ta osoba?” i „Czy to jest płatne?”. Napiwki w Indiach są zasadniczo dobrowolne, choć powszechne w turystyce i hotelarstwie.",
      },
      { kind: "p", text: "Przed rezerwacją wycieczki zapytaj dokładnie, co jest wliczone, i w miarę możliwości potwierdź to na piśmie:" },
      {
        kind: "list",
        items: [
          "🚗 Transport",
          "👨‍✈️ Kierowca",
          "🧑‍🏫 Przewodnik",
          "🎫 Bilety wstępu",
          "🍛 Posiłki",
          "🛣️ Opłaty drogowe",
          "🅿️ Parking",
          "⛽ Paliwo",
          "🧳 Bagaż",
          "🏨 Odbiór/dowóz z hotelu",
          "💸 Podatki",
          "💰 Napiwki",
        ],
      },
      {
        kind: "p",
        text: "Wtedy dokładnie wiesz, za co płacisz. Jeśli ktoś mówi, że coś jest bezpłatne, a potem zmienia zdanie — skłamał, więc się postaw. Zwykle sam sprzeciw wystarczy, by odpuścili.",
      },
      { kind: "heading", text: "Przystanek na zakupy" },
      {
        kind: "p",
        text: "Na zorganizowanych wycieczkach przewodnicy i kierowcy taksówek mogą polecać konkretne sklepy. Czasem to szczera rekomendacja; najczęściej przewodnik czy kierowca dostaje prowizję i jest to pułapka na turystów — z pewnością droższa, niekoniecznie oszustwo. Nie musisz niczego kupować.",
      },
      {
        kind: "p",
        text: "„Dziękujemy, rozejrzymy się” albo po prostu „Nie, dziękujemy, dzisiaj nie robimy zakupów” — obie opcje działają, a potem po prostu idź dalej. Nie jesteś winien/na zakupu komuś, kto Cię gdzieś podwiózł; to, że czeka, to jego ryzyko, nie Twój obowiązek. Ta sama dynamika pojawia się, gdy kierowcy sugerują „alternatywne” hotele lub sklepy.",
      },
      {
        kind: "list",
        items: [
          "„Nie, dziękuję, wszystko w porządku.”",
          "„Nie, dziękujemy, tylko oglądamy.”",
          "„Nie, niczego nie kupujemy.”",
          "„Nie, w porządku, już wszystko załatwiliśmy.”",
        ],
      },
      { kind: "heading", text: "Napiwki" },
      {
        kind: "p",
        text: "Napiwki są dość intuicyjne. Restauracje: dodaj 10% lub więcej, jeśli jesteś zadowolony/a — tak jak w Polsce czy Norwegii — opcjonalnie, nie obowiązkowo. Wszystko związane z obsługą, jak niesienie bagaży, to usługa warta drobnego napiwku.",
      },
      {
        kind: "table",
        headers: ["Sytuacja", "Co zrobić"],
        rows: [
          ["Sklep uliczny / market", "Bez napiwku"],
          ["Chai / obsługa przy ladzie", "Napiwek nieoczekiwany"],
          ["Riksza (auto-rickshaw)", "Napiwek niewymagany; zaokrąglenie w górę wystarczy"],
          ["Taksówka z aplikacji", "Opcjonalnie"],
          ["Bagażowy (lotnisko/hotel)", "Mały napiwek gotówką, jeśli niesie Twoje bagaże"],
          ["Sprzątanie pokoju", "Opcjonalnie"],
          ["Prywatny kierowca", "Napiwek na koniec, jeśli byłeś/aś zadowolony/a"],
          ["Prywatny przewodnik", "Napiwek na koniec, jeśli byłeś/aś zadowolony/a"],
          ["Restauracja", "Sprawdź rachunek, a potem daj napiwek, jeśli chcesz"],
          ["Wyjątkowa osobista usługa", "Napiwek, jeśli naprawdę chcesz"],
        ],
      },
      {
        kind: "table",
        headers: ["Kwota", "Co oznacza"],
        rows: [
          ["₹20–50", "Drobne podziękowanie / zaokrąglenie / bardzo mała usługa"],
          ["₹100", "Zwyczajny, drobny gest"],
          ["₹200–500", "Znaczący napiwek dla kogoś, kto naprawdę pomógł"],
        ],
      },
    ],
  },
  { title: "Przewodnik rodzinny", image: "/figma/guides/family-guide.png", body: notWrittenYet },
  {
    title: "Przygotowanie mentalne",
    image: "/figma/guides/mental-prep.png",
    body: [
      { kind: "heading", text: "Płacenie w Indiach" },
      {
        kind: "p",
        text: "Warto wiedzieć przed lądowaniem, bo Europa jest już na tyle bezgotówkowa, że łatwo założyć, że telefon załatwi wszystko. Indie mają ogromny system płatności cyfrowych zwany UPI, działający przez kody QR — zobaczysz go wszędzie, nawet w małym sklepiku skanującym ₹40 z kodu QR.",
      },
      {
        kind: "p",
        text: "Haczyk: UPI nie jest dla odwiedzającego tak proste jak dla mieszkańca Indii. NPCI oferuje „UPI One World” dla zagranicznych gości przez autoryzowane aplikacje partnerskie, ale wymaga to wcześniejszej rejestracji/KYC i jest pomyślane pod płatności u sprzedawców, a nie jako zamiennik indyjskiego konta bankowego.",
      },
      { kind: "p", text: "Podsumowując: weź kartę, miej trochę rupii i nie polegaj wyłącznie na telefonie." },
      {
        kind: "list",
        items: [
          "💳 Karta → hotele, większe restauracje, sklepy",
          "💵 Gotówka → małe sklepy, napiwki, transport, nieprzewidziane sytuacje",
          "📱 UPI → świetne, jeśli faktycznie je skonfigurujesz",
        ],
      },
      { kind: "p", text: "I nie trzeba przyjeżdżać z 500 euro w gotówce — tyle w ogóle nie potrzeba." },
      { kind: "heading", text: "Twój mały fundusz awaryjny" },
      {
        kind: "p",
        text: "Warto przyjechać z niewielką ilością rupii w drobnych nominałach — wręczenie komuś ₹2000 za usługę wartą ₹100 jest niezręczne, gdy nie ma wydać. Trzymaj banknoty ₹100/₹200/₹500 osobno od głównego portfela — na bagażowego, drobny napiwek, herbatę, mały sklep, kierowcę, ofiarę w świątyni, jeśli chcesz ją złożyć, albo dowolny nieprzewidziany drobny wydatek.",
      },
      { kind: "heading", text: "Orientacyjne porównanie cen" },
      {
        kind: "table",
        headers: ["", "Delhi", "Sambalpur"],
        rows: [
          ["Lokalny posiłek", "₹300–400 (30–40 NOK / 12–16 PLN)", "₹150–250 (15–25 NOK / 6–10 PLN)"],
          ["Kawa", "~₹220 (22 NOK / 9 PLN)", "~₹110 (11 NOK / 4 PLN)"],
          ["Dobry posiłek dla 2 osób", "~₹2000 (200 NOK / 80 PLN)", "~₹550–1100 (55–110 NOK / 22–44 PLN)"],
          ["Transport lokalny", "~₹40 (4 NOK / 1,6 PLN)", "~₹30 (3 NOK / 1 PLN)"],
          ["Hotel/noc", "~₹6500–9000 (650–900 NOK / 260–360 PLN)", "~₹2000–4000 (200–400 NOK / 80–160 PLN)"],
        ],
      },
      { kind: "heading", text: "Jeśli coś pójdzie nie tak" },
      { kind: "list", items: ["Hotel", "Linia lotnicza", "Punkt informacyjny na lotnisku", "Infolinia turystyczna — 1363", "Numer alarmowy — 112"] },
    ],
  },
  {
    title: "Kultura",
    image: "/figma/guides/culture.png",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "New Delhi",
    image: "/figma/guides/new-delhi.png",
    body: [
      { kind: "heading", text: "Delhi: jeśli masz tam przesiadkę" },
      {
        kind: "p",
        text: "To pewnie coś, co wygooglujesz o 2 nad ranem przed wyjazdem — więc oto krótka wersja. Najpierw sprawdź, jaki masz rodzaj połączenia — są trzy bardzo różne sytuacje.",
      },
      { kind: "heading", text: "Europa → Delhi → dalej po Indiach" },
      {
        kind: "p",
        text: "Przykład: Warszawa → Delhi → Jharsuguda. Wjeżdżasz do Indii w Delhi, co oznacza: imigracja → bagaż → odprawa celna → połączenie krajowe. Lotnisko w Delhi wprost mówi, że pasażerowie międzynarodowi przesiadający się na lot krajowy muszą przejść odprawę imigracyjną, odebrać bagaż i przejść przez cło na miejscu — nawet jeśli masz jedną kartę pokładową na cały odcinek podróży, nie zakładaj, że Twoja walizka pojedzie dalej bez Ciebie. IndiGo, na przykład, wymaga od pasażerów na połączeniach międzynarodowo-krajowych odebrania bagażu na pierwszym indyjskim lotnisku i nadania go ponownie na odcinek krajowy.",
      },
      { kind: "heading", text: "Delhi → Europa" },
      {
        kind: "p",
        text: "Odwrotna sytuacja: Twój lot krajowy ląduje w Delhi, a Ty lecisz dalej za granicę. Wszystkie odloty międzynarodowe odbywają się z Terminalu 3 — w zależności od tego, gdzie ląduje Twój lot krajowy i czy bagaż jest nadany na cały odcinek, może być konieczna zmiana terminalu i ponowna odprawa.",
      },
      { kind: "heading", text: "Międzynarodowy → międzynarodowy" },
      {
        kind: "p",
        text: "Przykład: Frankfurt → Delhi → Bangkok. Takie przesiadki odbywają się w całości w Terminalu 3 — podążaj za pomarańczowymi znakami. Może być potrzebna dodatkowa kontrola bezpieczeństwa, a warto wcześniej sprawdzić, czy Twoja konkretna trasa wymaga wizy tranzytowej.",
      },
      { kind: "heading", text: "System kolorów na lotnisku w Delhi" },
      { kind: "p", text: "Warto wiedzieć przed lądowaniem — dzięki temu lotnisko jest dużo mniej onieśmielające." },
      {
        kind: "list",
        items: [
          "🟡 Żółty = przesiadka krajowa — przylatujesz z zagranicy i lecisz dalej lotem krajowym: imigracja → bagaż → cło → podążaj za żółtymi znakami.",
          "🟠 Pomarańczowy = przesiadka międzynarodowa — przesiadasz się między lotami międzynarodowymi: podążaj za pomarańczowymi znakami.",
        ],
      },
      { kind: "heading", text: "Zmiana terminalu" },
      {
        kind: "p",
        text: "Delhi ma T1, T2 i T3 — bez paniki. Bezpłatny shuttle między terminalami kursuje 24/7, mniej więcej co 20 minut; weź kartę pokładową i podążaj za znakami samego lotniska. Nie idź za przypadkową osobą oferującą „zabranie do Terminalu 3” — podążaj za oficjalnymi znakami, a jeśli potrzebujesz pomocy, zapytaj pracownika lotniska lub punkt informacyjny.",
      },
      { kind: "heading", text: "Długa przesiadka — czy warto wyjść z lotniska?" },
      {
        kind: "list",
        items: [
          "2–4 godziny: zostań na lotnisku. Krótka przesiadka to już i tak imigracja, kontrola bezpieczeństwa, bagaż i logistyka terminali — nie próbuj do tego dokładać „zwiedzania Delhi”.",
          "5–8 godzin: możesz wyjść, ale zrezygnuj z ambitnego zwiedzania. Jeśli jesteś wykończony/a po długim locie, weź hotel, zjedz, weź prysznic i zresetuj się.",
          "Nocleg / 12–24 godziny: to sytuacja, w której zostanie w Delhi ma sens. Przy pierwszej wizycie wybierz nocleg pod kątem tego, dokąd lecisz dalej, a nie po prostu „najlepszego hotelu”.",
        ],
      },
      { kind: "heading", text: "Gdzie nocować w Delhi" },
      { kind: "subheading", text: "Aerocity — najprościej przy przesiadce" },
      {
        kind: "p",
        text: "Jeśli nocujesz w Delhi z powodu wczesnego lotu, zostań w Aerocity — dzielnicy hotelowej tuż przy lotnisku, którą samo lotnisko w Delhi poleca przy dłuższych przesiadkach. Holiday Inn New Delhi Int'l Airport, Novotel New Delhi Aerocity i Lemon Tree Premier Delhi Airport to opcje do wyboru — nie chodzi o to, że potrzebujesz akurat któregoś z nich, tylko że Aerocity to wygodny wybór, gdy priorytetem jest lotnisko.",
      },
      { kind: "subheading", text: "Connaught Place — jeśli chcesz faktycznie zobaczyć Delhi" },
      {
        kind: "p",
        text: "Mając pełny dzień lub dwa, bardziej opłaca się nocować centralnie — Connaught Place to jedno z głównych centrów miasta, z połączeniami metra, restauracjami i popularna baza dla osób odwiedzających Delhi po raz pierwszy. Radisson Blu Marina Hotel Connaught Place, The Connaught (IHCL SeleQtions) i The Lalit New Delhi znajdują się w tej okolicy.",
      },
      { kind: "subheading", text: "South Delhi — spokojniej" },
      {
        kind: "p",
        text: "Jeśli obawiasz się przebodźcowania, South Delhi jest spokojniejszą bazą niż najbardziej ruchliwe części miasta. Kompromis to większe poleganie na samochodach i metrze niż na chodzeniu pieszo.",
      },
      { kind: "heading", text: "„Twój hotel jest zamknięty”" },
      {
        kind: "p",
        text: "Jeśli kierowca taksówki mówi Ci, że Twój hotel jest zamknięty, trwa protest, droga jest zablokowana, zna lepszy hotel albo każe jechać do „tego biura turystycznego” — nie wierz mu od razu. Zadzwoń do hotelu, sprawdź Google Maps, sprawdź swoją rezerwację. Lotnisko w Delhi ma oficjalne taksówki z przedpłatą, a także opcje przez aplikacje, jak Uber i Ola.",
      },
      {
        kind: "p",
        text: "Dokładnie ten scenariusz „Twój hotel jest zamknięty / znam inny hotel” pojawia się w relacjach podróżnych, czasem kończąc się w miejscu, które płaci za takie skierowanie klientów. To nie znaczy, że kierowcy taksówek są niebezpieczni — to znaczy, że masz już hotel i nie potrzebujesz nieznajomego, żeby znalazł Ci inny.",
      },
    ],
  },
];

export type JourneyGroup = { label?: string; href: string; steps: string[] };

export const journey: JourneyPhase[] = [
  {
    date: "Przed wylotem",
    name: "Przygotuj się",
    accent: "orange",
    groups: [
      {
        label: "Loty",
        href: "#prepare",
        steps: [
          "Sprawdź ważność paszportu (min. 6 mies.)",
          "Porównaj ceny lotów",
          "Zarezerwuj loty",
          "Zapisz potwierdzenie rezerwacji",
          "Dodaj numery lotów do kalendarza",
          "Wyślij nam dane lotu, żebyśmy mogli po Ciebie przyjechać",
        ],
      },
      {
        label: "Wiza",
        href: "#prepare",
        steps: [
          "Wejdź na stronę e-wizy",
          "Wypełnij wniosek",
          "Zapłać opłatę 35 USD",
          "Zapisz PDF z zatwierdzoną wizą",
          "Wydrukuj papierową kopię na zapas",
        ],
      },
      {
        label: "Ubezpieczenie",
        href: "#prepare",
        steps: [
          "Sprawdź, czy Twoja karta już obejmuje ubezpieczenie podróżne",
          "Kup ubezpieczenie, jeśli nie",
          "Zapisz numer polisy w łatwo dostępnym miejscu",
          "Sprawdź, czy Twój poziom karty obejmuje dostęp do saloników lotniskowych",
        ],
      },
      {
        label: "Szczepienia",
        href: "#prepare",
        steps: [
          "Sprawdź, jakie szczepienia są zalecane",
          "Umów wizytę na szczepienie",
          "Przyjmij pierwszą dawkę",
          "Przyjmij drugą dawkę (jeśli wymagana)",
        ],
      },
      {
        label: "Leki",
        href: "#prepare",
        steps: [
          "Odlicz leki na receptę na cały wyjazd plus zapas",
          "Trzymaj leki w oryginalnym, opisanym opakowaniu",
          "Zapakuj leki do bagażu podręcznego",
          "Zapytaj lekarza o profilaktykę przeciwmalaryczną",
          "Kup małą apteczkę podróżną",
        ],
      },
      {
        label: "Pieniądze",
        href: "#prepare",
        steps: [
          "Zadzwoń do banku — poinformuj o podróży",
          "Sprawdź opłatę za transakcję zagraniczną na swojej karcie",
          "Wypłać lub wymień trochę gotówki",
        ],
      },
      {
        label: "Internet",
        href: "#prepare",
        steps: [
          "Pobierz Airalo lub Holafly",
          "Kup pakiet danych e-SIM do Indii",
          "Upewnij się, że domowa karta SIM zostanie aktywna do odbioru kodów OTP",
        ],
      },
      {
        label: "Pakowanie",
        href: "#what-to-wear",
        steps: [
          "Przeczytaj sekcję „Co na siebie” dla każdej okazji",
          "Spakuj lekkie, przewiewne tkaniny (ok. 30°C)",
          "Spakuj osobno strój na Haldi (ubranie, którego nie szkoda pobrudzić)",
          "Przygotuj błogosławieństwo lub list — bez prezentu",
        ],
      },
      {
        label: "Nastawienie",
        href: "#prepare",
        steps: ["Zobacz Sambalpur na Google Maps Street View", "Przeczytaj raz cały plan dzień po dniu poniżej"],
      },
    ],
  },
  {
    date: "17 grudnia",
    name: "Przyjazd",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Lądujesz",
          "Odprawa imigracyjna i celna",
          "Odnajdujesz swoją taksówkę",
          "Jedziesz do Grand Siba Hotel",
          "Meldunek",
          "Zostawiasz bagaż w pokoju",
          "Opcjonalne zakupy (15–19)",
          "Wieczór — wolny czas",
        ],
      },
    ],
  },
  {
    date: "18 grudnia",
    name: "Zaręczyny, Mehendi i kolacja",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Poranek — wolny czas",
          "Ubierasz się na zaręczyny",
          "Ceremonia zaręczyn (12–15)",
          "Zmiana stroju na Mehendi/kolację",
          "Mehendi (od 16:00)",
          "Pozwól hennie wyschnąć, zanim czegokolwiek dotkniesz",
          "Kolacja (wieczorem)",
          "Wieczór dobiega końca",
        ],
      },
    ],
  },
  {
    date: "19 grudnia",
    name: "Odpoczynek",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Poranek — odpoczynek",
          "Decyzja: safari czy zakupy",
          "Safari / zakupy (10:00–18:00)",
          "Ponowne pakowanie bagażu",
          "Wymeldowanie z Grand Siba",
          "Przejazd do The Royal Retreat",
          "Meldunek",
          "Przygotowanie stroju na jutrzejsze Haldi",
          "Wczesne pójście spać",
        ],
      },
    ],
  },
  {
    date: "20 grudnia",
    name: "Dzień ślubu",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Ubierz się w coś, czego nie szkoda pobrudzić",
          "Haldi (8:00–11:00)",
          "Zmywasz kurkumę pod prysznicem",
          "Odpoczynek w ciągu dnia",
          "Ubierasz się na ślub",
          "Baraat (od 15:00)",
          "Zajmujesz miejsce na ceremonię",
          "Ceremonia ślubna",
          "Przyjęcie (20:00–północ)",
          "Przywitaj się z Anną i Shibem, jeśli ich zobaczysz",
          "Wychodzisz, kiedy tylko chcesz",
        ],
      },
    ],
  },
  {
    date: "21 grudnia",
    name: "Wyjazd",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Spokojny poranek",
          "Pakowanie bagażu",
          "Wymeldowanie",
          "Decyzja: lot do Delhi czy podróż bezpośrednia",
          "Opcjonalny lot do Delhi (14:00–18:00)",
          "Dalsza podróż do domu",
          "Do zobaczenia",
        ],
      },
    ],
  },
];

guides.push({
  title: "Podróż gościa",
  image: "/figma/guides/journey.png",
  body: journey.flatMap((phase): GuideBlock[] => [
    { kind: "heading", text: `${phase.name} — ${phase.date}` },
    ...phase.groups.flatMap((g): GuideBlock[] => [
      ...(g.label ? [{ kind: "subheading", text: g.label } as GuideBlock] : []),
      { kind: "list", items: g.steps },
    ]),
  ]),
});

export type TimelineBlock = {
  label: string;
  start: number;
  end: number;
  optional?: boolean;
};

export type EventCard = {
  title: string;
  body: string;
  image: string;
};

const HEADER = {
  coral: { fill: "transparent", border: "#ff9595", text: "#ff9595" },
  orange: { fill: "#ed8235", border: "#ed8235", text: "#642526" },
  cream: { fill: "#efe4ce", border: "#efe4ce", text: "#642526" },
} satisfies Record<string, DayHeader>;

export const days: Day[] = [
  {
    id: "arrival",
    date: "17 grudnia",
    name: "Przyjazd",
    header: HEADER.coral,
    blocks: [{ label: "(Opcjonalnie) Zakupy", start: 15, end: 19, optional: true }],
    cards: [
      {
        title: "Odbiór taksówką",
        body: "Odbierzemy Cię, gdy dotrzesz na lotnisko, więc daj nam znać dzień i godzinę przylotu.",
        image: "/figma/schedule/card-taxi.jpg",
      },
      {
        title: "Grand Siba Hotel",
        body: "Taksówka zawiezie Cię do hotelu w Sambalpurze. Spędzimy tam 2 noce.",
        image: "/figma/schedule/card-hotel.jpg",
      },
      {
        title: "Zakupy są opcjonalne",
        body: "Kolejna okazja, by kupić ubrania na ceremonię, będzie 19 grudnia.",
        image: "/figma/schedule/card-shop.jpg",
      },
    ],
  },
  {
    id: "prewedding",
    date: "18 grudnia",
    name: "Przed ślubem",
    header: HEADER.orange,
    blocks: [
      { label: "Zaręczyny", start: 12, end: 15 },
      { label: "Mehendi / Henna i kolacja", start: 16, end: 23 },
    ],
    cards: [
      {
        title: "Zaręczyny",
        body: "Rodziny się poznają, wymiana pierścionków, Anna i Shib otrzymują błogosławieństwo. Spokojny początek.",
        image: "/figma/engagement.jpg",
      },
      {
        title: "Mehendi",
        body: "Henna na dłoniach panny młodej (i każdego gościa, który chce), muzyka, jedzenie, żadnej presji rytuału.",
        image: "/figma/mehendi.jpg",
      },
      {
        title: "Kolacja",
        body: "Kolacja w europejskim stylu. Rozmawiamy, tańczymy i bawimy się. Nie jest częścią oficjalnej ceremonii. Strój elegancko-casualowy.",
        image: "/figma/sangeet.jpg",
      },
    ],
  },
  {
    id: "recovery",
    date: "19 grudnia",
    name: "Odpoczynek",
    header: HEADER.cream,
    blocks: [
      {
        label: "(Opcjonalnie) Safari lub zakupy",
        start: 10,
        end: 18,
        optional: true,
      },
    ],
    cards: [
      {
        title: "Opcjonalna rozrywka",
        body: "Opcjonalne safari i/lub opcjonalne zakupy i odpoczynek przed wielkim dniem.",
        image: "/figma/story-tree.jpg",
      },
      {
        title: "Meldunek w kolejnym hotelu",
        body: "Musimy zameldować się w innym hotelu, w którym odbędzie się ceremonia ślubna.",
        image: "/figma/hotel.jpg",
      },
    ],
  },
  {
    id: "wedding",
    date: "20 grudnia",
    name: "Ślub",
    header: HEADER.orange,
    blocks: [
      { label: "Haldi", start: 8, end: 11 },
      { label: "Baraat i ślub", start: 15, end: 20 },
      { label: "Przyjęcie", start: 20, end: 24 },
    ],
    cards: [
      {
        title: "Haldi",
        body: "Nakładanie pasty z kurkumy na Annę i Shiba na szczęście. Bałaganiarskie, radosne. Rytuał oczyszczenia.",
        image: "/figma/haldi.jpg",
      },
      {
        title: "Baraat",
        body: "Orszak pana młodego przybywa z muzyką i tańcem. Głośno, radośnie, bądź gotowy/a do ruchu.",
        image: "/figma/baraat.jpg",
      },
      {
        title: "Ceremonia ślubna",
        body: "Właściwe przysięgi i rytuały. Długie i nudnawe.",
        image: "/figma/wedding-ceremony.jpg",
      },
      {
        title: "Przyjęcie",
        body: "Kolacja dla całej wioski. Głośno i intensywnie — można pominąć. Anna i Shib będą witać się z mieszkańcami wioski.",
        image: "/figma/reception.jpg",
      },
    ],
  },
  {
    id: "departure",
    date: "21 grudnia",
    name: "Wyjazd",
    header: HEADER.coral,
    blocks: [
      { label: "Lot do Delhi", start: 14, end: 18, optional: true },
    ],
    cards: [
      {
        title: "Lot do Delhi",
        body: "Po południu wszyscy lecimy do Delhi, żeby upewnić się, że rodzice Anny bezpiecznie wrócą do domu.",
        image: "/figma/taxi-map.jpg",
      },
    ],
  },
];

export const TIMELINE_START = 6;
export const TIMELINE_END = 24;
export const timelineTicks = ["6:00", "południe", "18:00", "północ"];

export type GarmentCategory = "top" | "bottom" | "shoes" | "bag" | "jewelry" | "layers" | "outfit";

export type Garment = {
  person: "him" | "her";
  category: GarmentCategory;
  label: string;
  image: string;
};

const casualColors = [
  "#8a38f5",
  "#007cd4",
  "#00c452",
  "#649a00",
  "#f600c5",
  "#ed8235",
  "#ff7b00",
  "#cb8000",
  "#f4cc03",
  "#ffed92",
  "#fdffd9",
  "#8f0a0d",
];
const mehendiColors = ["#8c8c4d", "#8c1c1c", "#468c46", "#5d8c2e", "#8c661c", "#4d8c4d", "#a8a85c"];
const haldiColors = ["#d87676", "#e5c37e", "#d8d876", "#8c1c1c", "#a87730", "#f4cc03", "#fdffd9"];
const weddingColors = ["#8c5438", "#d87860", "#8c4646", "#901c1c", "#8c8c46", "#c09048", "#8c541c"];

const casualFits: Fit[] = [
  {
    name: "Look 1",
    image: "/figma/outfit/looks/casual-1.webp",
    notes: {
      him: "Niepraktyczne, ale tak ubiera się większość Hindusów. Tak wiedz.",
      her: "Dodatki i biżuteria zawsze są w modzie w Indiach.",
    },
    garments: [
      { person: "him", category: "top", label: "Koszula", image: "/figma/outfit/garments/him-look1-shirt.png" },
      { person: "him", category: "bottom", label: "Jeansy", image: "/figma/outfit/garments/him-look1-jeans.png" },
      { person: "him", category: "shoes", label: "Buty", image: "/figma/outfit/garments/him-look1-shoes.png" },
      { person: "her", category: "top", label: "Koszula", image: "/figma/outfit/garments/her-white-shirt.png" },
      { person: "her", category: "bottom", label: "Spódnica", image: "/figma/outfit/garments/her-look1-skirt.png" },
      { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/sandals-woven.png" },
      { person: "her", category: "bag", label: "Torebka", image: "/figma/outfit/garments/potli.png" },
      { person: "her", category: "bag", label: "Torebka patchworkowa", image: "/figma/outfit/garments/her-casual1-bag2.png" },
      { person: "her", category: "jewelry", label: "Bransoletki", image: "/figma/outfit/garments/bangles.png" },
    ],
  },
  {
    name: "Look 2",
    image: "/figma/outfit/looks/casual-2.webp",
    notes: {
      him: "Bardzo rozsądne.",
      her: "Ładne torebki są świetne, uznawane za modne.",
    },
    garments: [
      { person: "him", category: "top", label: "Koszula", image: "/figma/outfit/garments/him-white-shirt.png" },
      { person: "him", category: "bottom", label: "Spodnie", image: "/figma/outfit/garments/him-look2-pants.png" },
      { person: "him", category: "shoes", label: "Buty", image: "/figma/outfit/garments/him-look2-shoes.png" },
      { person: "her", category: "top", label: "Kurta", image: "/figma/outfit/garments/her-look2-kurta.png" },
      { person: "her", category: "bottom", label: "Spodnie", image: "/figma/outfit/garments/her-look2-pants.png" },
      { person: "her", category: "shoes", label: "Japonki", image: "/figma/outfit/garments/flipflops.png" },
      { person: "her", category: "bag", label: "Torebka", image: "/figma/outfit/garments/potli.png" },
      { person: "her", category: "jewelry", label: "Kolczyki", image: "/figma/outfit/garments/her-casual2-jewelry.png" },
    ],
  },
  {
    name: "Look 3",
    image: "/figma/outfit/looks/casual-3.webp",
    notes: {
      him: "Bez błyskotek, mniej elegancko.",
      her: "Im więcej błyskotek, tym bardziej elegancko.",
    },
    garments: [
      { person: "him", category: "outfit", label: "Strój", image: "/figma/outfit/garments/him-tunic-pants.png" },
      { person: "him", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/him-sandals-tan.png" },
      { person: "her", category: "top", label: "Tunika", image: "/figma/outfit/garments/her-look3-tunic.png" },
      { person: "her", category: "bottom", label: "Spodnie", image: "/figma/outfit/garments/her-look3-pants.png" },
      { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-sandals-coral.png" },
      { person: "her", category: "bag", label: "Torba", image: "/figma/outfit/garments/her-tote-black.png" },
      { person: "her", category: "jewelry", label: "Kolczyk", image: "/figma/outfit/garments/her-casual3-jewelry.png" },
    ],
  },
];

export const occasions: Occasion[] = [
  {
    id: "casual",
    day: "Dzień 1",
    labels: ["Casual"],
    fits: casualFits,
    colors: casualColors,
  },
  {
    id: "mehendi",
    day: "Dzień 2",
    labels: ["Zaręczyny, Mehendi i kolacja"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/mehendi-1.webp",
        notes: {
          him: "Zielona kurta + białe spodnie. Wygodnie, przewiewnie.",
          her: "Musztardowy zestaw kurta, pasiasta dupatta, koralikowa kopertówka.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-mehendi1-outfit.png" },
          { person: "her", category: "outfit", label: "Kurta i dupatta", image: "/figma/outfit/garments/her-mehendi1-outfit.png" },
          { person: "her", category: "bag", label: "Kopertówka", image: "/figma/outfit/garments/her-mehendi1-bag.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-mehendi1-shoes.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/mehendi-2.webp",
        notes: {
          him: "Wzorzysta kurta, więcej deseni.",
          her: "Szałwiowa kurta z przezroczystą dupattą.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-mehendi2-outfit.png" },
          { person: "her", category: "outfit", label: "Kurta i dupatta", image: "/figma/outfit/garments/her-mehendi2-outfit.png" },
          { person: "her", category: "jewelry", label: "Kolczyki", image: "/figma/outfit/garments/her-mehendi2-jewelry.png" },
          { person: "her", category: "bag", label: "Kopertówka", image: "/figma/outfit/garments/her-mehendi2-bag.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-mehendi2-shoes.png" },
        ],
      },
    ],
    colors: mehendiColors,
  },
  {
    id: "haldi",
    day: "Dzień 3",
    labels: ["Haldi"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/haldi-1.webp",
        notes: {
          him: "Żółta kurta + białe lniane spodnie to świetny wybór.",
          her: "Prosty biały garnitur salwar + żółty szal.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi1-outfit.png" },
          { person: "him", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/him-haldi1-shoes.png" },
          { person: "her", category: "outfit", label: "Strój", image: "/figma/outfit/garments/her-haldi1-outfit.png" },
          { person: "her", category: "jewelry", label: "Kolczyki", image: "/figma/outfit/garments/her-haldi1-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-haldi1-shoes.png" },
          { person: "her", category: "bag", label: "Torebka", image: "/figma/outfit/garments/her-haldi1-bag.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/haldi-2.webp",
        notes: {
          him: "Więcej detali = uznawane za bardziej eleganckie.",
          her: "Więcej połysku też jest miło. Garnitur salwar + dupatta.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi2-outfit.png" },
          { person: "her", category: "outfit", label: "Strój", image: "/figma/outfit/garments/her-haldi2-outfit.png" },
          { person: "her", category: "jewelry", label: "Bransoletka", image: "/figma/outfit/garments/her-haldi2-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-haldi2-shoes.png" },
          { person: "her", category: "bag", label: "Torebka", image: "/figma/outfit/garments/her-haldi2-bag.png" },
        ],
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/haldi-3.webp",
        notes: {
          him: "Dłuższa kurta + białe spodnie.",
          her: "Anarkali z odrobiną błysku.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi3-outfit.png" },
          { person: "her", category: "outfit", label: "Strój", image: "/figma/outfit/garments/her-haldi3-outfit.png" },
          { person: "her", category: "jewelry", label: "Naszyjnik", image: "/figma/outfit/garments/her-haldi3-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-haldi3-shoes.png" },
          { person: "her", category: "bag", label: "Torebka", image: "/figma/outfit/garments/her-haldi3-bag.png" },
        ],
      },
    ],
    colors: haldiColors,
  },
  {
    id: "wedding",
    day: "Dzień 3",
    labels: ["Ślub i przyjęcie"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/wedding-1.webp",
        notes: {
          him: "Europejski garnitur to świetny pomysł.",
          her: "Błyszczące sari.",
        },
        herStyle: "sari",
        garments: [
          { person: "him", category: "outfit", label: "Garnitur", image: "/figma/outfit/garments/him-wedding1-outfit.png" },
          { person: "her", category: "outfit", label: "Sari", image: "/figma/outfit/garments/her-wedding1-outfit.png" },
          { person: "her", category: "layers", label: "Bluzka i halka", image: "/figma/outfit/garments/her-wedding1-layers.png" },
          { person: "her", category: "shoes", label: "Baleriny", image: "/figma/outfit/garments/her-wedding1-shoes.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/wedding-2.webp",
        notes: {
          him: "Zdobiona koralikami kurta. Bardzo elegancko.",
          her: "Zestaw lehenga (góra + spódnica) z dupattą.",
        },
        garments: [
          { person: "her", category: "outfit", label: "Sari", image: "/figma/outfit/garments/her-wedding2-outfit.png" },
          { person: "her", category: "shoes", label: "Sandały", image: "/figma/outfit/garments/her-wedding2-shoes.png" },
        ],
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/wedding-3.webp",
        notes: {
          him: "Kurta zdobiona koralikami.",
          her: "Sari w intensywnym kolorze.",
        },
        herStyle: "sari",
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-wedding3-outfit.png" },
          { person: "her", category: "outfit", label: "Lehenga", image: "/figma/outfit/garments/her-wedding3-outfit.png" },
        ],
      },
    ],
    colors: weddingColors,
  },
  {
    id: "casual-2",
    day: "Dzień 4",
    labels: ["Casual"],
    fits: casualFits,
    colors: casualColors,
  },
];
