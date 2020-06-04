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
        description: "Wyświetl listę zakładek, jakie utworzyłeś i opcjonalnie możesz je filtrować tematami. Możesz szybko przejść do dowolnej zakładki. Możesz dowiedzieć się więcej o zakładkach z pomocy w języku angielskim.",
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
      title: "Library of Christ Mind Teachings",
      description: "This page is part of the Teachings of Christ Mind Library. Click this link to navigate to the Library's Home page.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#src-title",
    popover: {
      title: "Way of Mastery",
      description: "This page comes from the Way of Mastery. Click this link to navigate to the Home page of the Way of Mastery.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#book-title",
    popover: {
      title: "Book Title",
      description: "This identifies the book and chapter of the content on this page.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "Bookmarks",
      description: "You can create a bookmark from highlighted text and associate the bookmark with one or more categories. Learn more about bookmarks by reading the documentation.",
      position: "right"
    }
  });

  if ($(".search-modal-open").length > 0) {
    steps.push({
      element: ".search-modal-open",
      popover: {
        title: "Search Through All Books",
        description: "Find topics of interest by searching through all Way of Mastery books.",
        position: "bottom"
      }
    });
  }

  if (!$(".audio-player-toggle").hasClass("hide")) {
    steps.push({
      element: ".audio-player-toggle",
      popover: {
        title: "Listen to the Audio",
        description: "Click the speaker icon to display the audio player and listen along as you read.",
        position: "bottom"
      }
    });
  }

  steps.push({
    element: ".toggle-paragraph-markers",
    popover: {
      title: "Show/Hide Paragraph Markers",
      description: "Show or hide the markers that preceed each paragraph.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".top-of-page",
    popover: {
      title: "Go To Top of Page",
      description: "Quickly jump to the top of the page.",
      position: "bottom"
    }
  });


  steps.push({
    element: "#contents-modal-open",
    popover: {
      title: "Table of Contents",
      description: "View the table of contents.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".previous-page",
    popover: {
      title: "Previous Page",
      description: "Go to the previous page. This will be disabled when the first page is displayed.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".next-page",
    popover: {
      title: "Next Page",
      description: "Go to the next page. This will be disabled when the last page is displayed.",
      position: "bottom"
    }
  });

  steps.push({
      element: "#quick-links-dropdown-menu",
      popover: {
        title: "Navigate to Another Teaching",
        description: "Quickly jump to one of the other teachings in the Library.",
        position: "bottom"
      }
    });

  steps.push({
    element: "#about-dropdown-menu",
    popover: {
      title: "Get Help",
      description: "Learn how to use features of the Library.",
      position: "bottom"
    }
  });

  steps.push({
    element: ".login-menu-option",
    popover: {
      title: "Sign In/Sign Out",
      description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
      position: "bottom"
    }
  });

  driver.defineSteps(steps);
  driver.start();
}

