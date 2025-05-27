const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;

    const dansstijlen = {
  "Ballerina": [
    "Ballet in Italië begon en niet in Frankrijk? Door alle Franse termen die gebruikt worden in het ballet, wordt er vaak gedacht dat ballet Frans is. Eigenlijk begon ballet in de 15de eeuw aan de Italiaanse hoven en werd later populair in Frankrijk toen Catherine de’ Medici, een Franse koningin met Italiaanse nationaliteit, het meenam naar het Franse hof.",
    "Vroeger alleen mannen ballet dansten? In de 15de en 16de eeuw werd ballet alleen door mannen uitgevoerd. Pas rond 1680 verschenen de eerste vrouwen op het toneel.",
    "Het Zwanenmeer eerst flopte? De eerste uitvoering van Tsjaikovski’s ‘Het Zwanenmeer’ was geen succes. Pas na zijn dood werd het herzien en wereldberoemd.",
    "Een tutu meer kan kosten dan een trouwjurk? Sommige tutu’s kosten meer dan €2000 door handwerk, kristallen en fijne materialen.",
    "Ballet je botten kan vervormen? Intensieve training kan leiden tot blijvende fysieke veranderingen, zoals een verhoogde wreef of permanente turnout."
  ],
  "Salsa": [
    "Salsa komt uit het Caribisch gebied.",
    "De muziek heeft invloeden uit Cuba en Puerto Rico.",
    "Salsa wordt meestal in koppels gedanst.",
    "‘Salsa’ betekent ‘saus’, verwijzend naar de mix van muziekstijlen waaruit het ontstaan is.",
    "Je bij salsa telt in 8 tellen, maar je er maar 6 danst: 1,2,3 - pauze - 5,6,7 - pauze.",
    "De grootste salsa flashmob ooit vond plaats in Venezuela met 2.040 dansers in 2022.",
    "Dansers communiceren vaak zonder woorden via subtiele lichaamssignalen.",
    "Salsa is goed voor je lichaam én hersenen: het verbetert geheugen, balans en cardiovasculaire gezondheid."
  ],
  "Tango": [
    "Tango is ontstaan in Argentinië.",
    "Het is een gepassioneerde dans met scherpe bewegingen.",
    "Tango gebruikt vaak de bandoneon, een soort accordeon."
  ],
  "Ierse dans": [
    "Dansers vroeger op houten deuren oefenden? Zo ontstond het perfecte geluid voor hardshoe!",
    "De stijve armhouding mogelijk is ontstaan om dansen voor de Britten te verbergen.",
    "Een Ierse dansjurk tot wel €3000 kan kosten door het handwerk en kristallen.",
    "Er speciale krulpruiken gedragen worden tijdens wedstrijden voor een traditionele uitstraling.",
    "Sommige dansers doen meer dan 100 sprongen in één optreden – pure topsport!"
  ],
  "Flamenco": [
    "Mannen vroeger meer flamenco dansten dan vrouwen – als uiting van kracht en trots.",
    "Er meer dan 50 stijlen (‘palos’) van flamenco bestaan, elk met een eigen ritme en sfeer.",
    "Je in Spanje flamencoshows kunt bijwonen in grotten met natuurlijke akoestiek.",
    "Flamenco vroeger in het geheim werd uitgevoerd vanwege onderdrukking van de Roma-gemeenschap.",
    "‘Duende’ het magische element is dat staat voor passie en ziel in flamenco-optredens."
  ]
};

    const sectors = Object.keys(dansstijlen);
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'];

    let angle = 0;
    let spinning = false;

    function drawWheel() {
      const step = (2 * Math.PI) / sectors.length;
      for (let i = 0; i < sectors.length; i++) {
        const start = angle + i * step;
        const end = start + step;
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, start, end);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(start + step / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(sectors[i], radius - 10, 10);
        ctx.restore();
      }
    }

    function spinWheel() {
      if (spinning) return;
      spinning = true;
      const spinAngle = Math.random() * 2000 + 3000; // willekeurige draaihoek
      const duration = 4000; // 4 seconden
      const start = performance.now();

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // easing
        angle = (spinAngle * easeOut) % (2 * Math.PI);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          showResult();
          spinning = false;
        }
      }

      requestAnimationFrame(animate);
    }

    function showResult() {
      const step = (2 * Math.PI) / sectors.length;
      const index = sectors.length - Math.floor(((angle + step / 2) % (2 * Math.PI)) / step) - 1;
      const chosen = sectors[index];
      const weetjes = dansstijlen[chosen];
      const weetje = weetjes[Math.floor(Math.random() * weetjes.length)];
      document.getElementById('result').innerHTML = `
        <p>🎉 Jij bent een <strong>${chosen}</strong> danser!</p>
        <p>💡 Wist je dat: ${weetje}</p>
      `;
    }

    drawWheel(); // initiale tekening