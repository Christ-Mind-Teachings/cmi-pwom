import Driver from "driver.js";

export function pageDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5,
    onHighlightStarted: (el) => {
      console.log("highlighting %o", el);
    }
  });

  driver.defineSteps([
    {
      element: "#source-homepage",
      popover: {
        title: "Droga Mistrzostwa",
        description: "Oto główna strona wszystkich nauk <em>Drogi Mistrzostwa</em> umieszczonych w niniejszej Bibliotece. Trzy książki posiadają ścieżkę dźwiekową i można je czytać jednocześnie słuchając.<br><br>Kliknij na obrazek książki, aby zobaczyć spis treści&hellip;",
        position: "bottom"
      }
    },
    {
      element: "[data-book='woh']",
      popover: {
        title: "Droga Serca",
        description: "Pierwsza z trzech książek, które tworzą trzyletni proces duchowej ścieżki przebudzenia.",
        position: "top"
      }
    },
    {
      element: "[data-book='wot']",
      popover: {
        title: "Droga Przemiany",
        description: "Drugi rok comiesięcznych lekcji prowadzących do przemiany serca i umysłu.",
        position: "top"
      }
    },
    {
      element: "[data-book='wok']",
      popover: {
        title: "Droga Poznania",
        description: "Ostatni tom, który zamyka trylogię <em>Drogi Mistrzostwa</em>.",
        position: "top"
      }
    },
    {
      element: "[data-book='tjl']",
      popover: {
        title: "Listy Jeszuy",
        description: "Opowieść Jayema o pojawieniu się Jeszuy w jego życiu i danych mu naukach nazwanych Listami Jeszuy.",
        position: "top"
      }
    },
    {
      element: "[data-book='wos']",
      popover: {
        title: "Droga Sługi",
        description: "Poetycki opis podróży przebudzenia, od narodzenia do rozpoznania siebie jako sługi, który kroczy przebudzony w służbie dla wszystkich swych sióstr i braci.",
        position: "top"
      }
    },
    {
      element: "[data-book='early']",
      popover: {
        title: "Wczesne lata",
        description: "Zbiór przesłań danych przed powstaniem <em>Drogi Serca</em>, pierwszej części trylogii <em>Drogi Mistrzostwa</em>.",
        position: "top"
      }
    }
  ]);

  driver.start();
}

export function pageNavigationDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5,
    onReset: () => {
      $("#bookmark-dropdown-menu").dropdown("hide");
    }
  });
  driver.defineSteps([
    {
      element: "#masthead-title",
      popover: {
        title: "Nawigacja i funkcjonalności",
        description: "Droga Mistrzostwa jest częśćią Biblioteki Nauk Umysłu Chrystusa. Na każdej stronie możesz kliknąć w tym miejscu, aby wyświetlić główną stronę Biblioteki z wszystkimi dostępnymi naukami.",
        position: "bottom"
      }
    },
    {
      element: "#page-menu",
      popover: {
        title: "Menu",
        description: "To jest menu strony. Jest ono zawsze widoczne i dostępne, gdy przewijasz stronę w dół czytając lub przeszukując tekst. Menu na innych stronach jest podobne, lecz może mieć dodatkowe funkcjonalności.",
        position: "bottom"
      }
    },
    {
      element: ".bookmark-modal-open",
      popover: {
        title: "Lista zakładek",
        description: "Wyświetl listę zakładek, jakie utworzyłeś i opcjonalnie możesz je filtrować tematami. Możesz szybko przejść do dowolnej zakładki. Możesz dowiedzieć się więcej o zakładkach z instrukcji wideo.",
        position: "bottom"
      }
    },
    {
      element: ".search-modal-open",
      popover: {
        title: "Szukaj we wszystkich książkach",
        description: "Możesz wyszukiwać interesujące cię tematy we wszystkich książkach Drogi Mistrzostwa.",
        position: "bottom"
      }
    },
    {
      element: "#quick-links-dropdown-menu",
      popover: {
        title: "Przejdź do innych nauk Biblioteki",
        description: "Szybko przejdź do innych nauk zebranych w Bibliotece.",
        position: "bottom"
      }
    },
    {
      element: "#help-menu",
      popover: {
        title: "Pomoc oraz informacje",
        description: "Dowiedz się więcej na temat nauk oraz funkcjonalności strony.",
        position: "bottom"
      }
    },
    {
      element: ".login-menu-option",
      popover: {
        title: "Zaloguj się/Załóż konto",
        description: "Załóż konto i zaloguj się do strony. Konto jest darmowe i pozwala tworzyć własne zakładki ( zaznaczone fragmenty tekstu). Możesz dzielić się tak utworzonymi zakładkami na Facebooku.",
        position: "left"
      }
    },
    {
      element: "[data-book='wot']",
      popover: {
        title: "Pokaż spis treści",
        description: "Kliknij na dowolny obrazek książki, aby wyświetlić spis treści.",
        position: "left"
      }
    }
  ]);

  driver.start();
}

export function transcriptDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5
    /*
    onReset: () => {
      $("#bookmark-dropdown-menu").dropdown("hide");
    }
    */
  });

  let steps = [];

  steps.push({
    element: "#masthead-title",
    popover: {
      title: "Bibliotek Nauk Umysłu Chrystusa",
      description: "Ta strona jest częścią Biblioteki Nauk Umysłu Chrystusa. Kliknij ten link, aby przejść do strony głównej Biblioteki.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#src-title",
    popover: {
      title: "Droga Mistrzostwa",
      description: "Ta strona pochodzi z Drogi Mistrzostwa. Kliknij ten link, aby przejść do strony głównej Drogi Mistrzostwa.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#book-title",
    popover: {
      title: "Tytuł książki",
      description: "To identyfikuje książkę i rozdział treści z tej strony.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "Zakładki",
      description: "Możesz utworzyć zakładkę z zakreślonego tekstu i powiązać ją z jedną lub z większą liczbą kategorii.",
      position: "right"
    }
  });

  if ($(".search-modal-open").length > 0) {
    steps.push({
      element: ".search-modal-open",
      popover: {
        title: "Szukaj we wszystkich książkach",
        description: "Znajdź interesujące cię tematy, przeszukując wszystkie książki Drogi Mistrzostwa.",
        position: "bottom"
      }
    });
  }

  if (!$(".audio-player-toggle").hasClass("hide")) {
    steps.push({
      element: ".audio-player-toggle",
      popover: {
        title: "Posłuchaj nagrania audio",
        description: "Kliknij ikonę głośnika, aby wyświetlić odtwarzacz audio. Możesz czytać tekst jednocześnie go słuchając.",
        position: "bottom"
      }
    });
  }

  steps.push({
    element: ".toggle-paragraph-markers",
    popover: {
      title: "Pokaż/Ukryj znaczniki akapitów.",
      description: "Pokaż lub ukryj znaczniki, które poprzedzają każdy akapit.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".top-of-page",
    popover: {
      title: "Idź na górę strony",
      description: "Przejdź szybko na górę strony.",
      position: "bottom"
    }
  });


  steps.push({
    element: "#contents-modal-open",
    popover: {
      title: "Spis treści",
      description: "Zobacz spis treści.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".previous-page",
    popover: {
      title: "Poprzednia strona",
      description: "Idź do poprzedniej strony. Zostanie to wyłączone, kiedy pierwsza strona zostanie wyświetlona.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".next-page",
    popover: {
      title: "Następna strona",
      description: "Idź do następnej strony. Zostanie to wyłączone, kiedy ostatnia strona zostanie wyświetlona.",
      position: "bottom"
    }
  });

  steps.push({
      element: "#quick-links-dropdown-menu",
      popover: {
        title: "Przejdź do kolejnych nauk",
        description: "Szybko przejdź do kolejnych nauk Biblioteki.",
        position: "bottom"
      }
    });

  steps.push({
    element: "#about-dropdown-menu",
    popover: {
      title: "Pomoc",
      description: "Dowiedz się, jak używać funkcjonalności Biblioteki.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".login-menu-option",
    popover: {
      title: "Zaloguj się/Wyloguj się",
      description: "Utwórz konto i zaloguj lub wyloguj się. Kiedy się zalogujesz, zakładki, które utworzysz, będą dostępne na wszystkich urządzeniach, jakich używasz do łączenia się z Biblioteką w internecie.",
      position: "bottom"
    }
  });

  driver.defineSteps(steps);
  driver.start();
}

