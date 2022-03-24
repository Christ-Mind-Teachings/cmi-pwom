---
layout: page
masthead: home
title: "Droga Mistrzostwa"
footer:
  display: true
  donate: false
  id: "CMI-PWOM"
  source: "WOM"
  repohref: "https://github.com/Christ-Mind-Teachings/cmi-pwom"
---

## Witamy na Drodze Mistrzostwa
{: .ui.header}

<div class="page-introduction" markdown="1">

Wszystkie książki wchodzące w skład Drogi Mistrzostwa możesz kupić w
sklepie <a href="https://pokojchrystusa.pl" target="_blank">Wydawnictwa Pokoju Chrystusa</a>.

</div>

<div id="page-contents">
  <div class="ui equal width grid source-acq-section">
    <div class="five wide column">
      <div class="ui card">
        <a id="book-acq" href="#" data-book="acq" animate class="toc-modal-open image">
          {% if site.environment == "standalone" %}
            <img src="/public/img/wom/acq-big.jpg">
          {% else %}
            <img src="/t/pwom/public/img/wom/acq-big.jpg">
          {% endif %}
        </a>
        <div class="content">
          <div class="description">
            Dowiedz się więcej o Drodze Mistrzostwa
          </div>
        </div>
      </div>
    </div>
    <div class="column source-features">
      <div class="ui top attached tabular menu">
        <a class="active item" data-tab="first">Cytaty</a>
        <a class="item" data-tab="second">Wybierz cytat</a>
      </div>
      <div id="news-tab-content" class="ui bottom attached active tab segment" data-tab="first">
        <div class="box">
          <p>
            Wybierz losowy cytat z Drogi Mistrzostwa i otwórz serce na jego przesłanie.
          </p>
        </div>
      </div>
      <div id="quote-tab-content" class="ui bottom attached tab segment" data-tab="second">
        <div class="ui form">
          <div class="fields">
            <div class="field">
              <label>Zainspiruj się</label>
              <button id="show-quote-button" class="ui primary button">
                <i class="quote left icon"></i>
                Przeczytaj cytat
              </button> 
            </div>
            <div id="user-quote-select" class="field"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ui three cards">
    <div class="card">
      <a id="book-lj" href="#" data-book="lj" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/lj-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/lj-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Listy Jeszuy
        </div>
      </div>
    </div>
    <div class="card">
      <a id="book-wos" href="#" data-book="wos" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/wos-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/wos-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Droga Sługi
        </div>
      </div>
    </div>
  </div>
  <div class="ui three cards">
    <div class="card">
      <a id="book-early" href="#" data-book="early" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/early-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/early-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Wczesne lata, Tom 1
        </div>
      </div>
    </div>
    <div class="card">
      <a id="book-early2" href="#" data-book="early2" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/early2-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/early2-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Wczesne lata, Tom 2
        </div>
      </div>
    </div>
  </div>
  <div class="ui three cards">
    <div class="card">
      <a id="book-woh" href="#" data-book="woh" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/woh-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/woh-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Droga Serca
        </div>
      </div>
    </div>
    <div class="card">
      <a id="book-wot" href="#" data-book="wot" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/wot-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/wot-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Droga Przemiany
        </div>
      </div>
    </div>
    <div class="card">
      <a id="book-wok" href="#" data-book="wok" class="toc-modal-open image">
        {% if site.environment == "standalone" %}
          <img src="/public/img/wom/wok-big.jpg">
        {% else %}
          <img src="/t/pwom/public/img/wom/wok-big.jpg">
        {% endif %}
      </a>
      <div class="content">
        <div class="description">
          Droga Poznania
        </div>
      </div>
    </div>
  </div>
</div>
