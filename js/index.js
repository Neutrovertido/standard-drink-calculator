document.addEventListener("DOMContentLoaded", function () {
    // Buttons
    const calculateBtn = document.getElementById("calculate");
    const resultDiv = document.getElementById("results");
    const dilutionSection = document.getElementById("dilution-section");
    const yesDiluteBtn = document.getElementById("yes-dilute");
    const noDiluteBtn = document.getElementById("no-dilute");
    const calculateFinalBtn = document.getElementById("calculate-final");
    const enBtn = document.getElementById("en-btn");
    const esBtn = document.getElementById("es-btn");

    // Language states
    let currentLanguage = "en";

    // Language translation object
    const translations = {
        en: {
            "app-title": "💧 Standard Drink Calculator",
            "abv-label": "Enter the ABV of your alcoholic beverage (%):",
            "drinks-label": "Enter the number of US standard drinks you want:",
            "drink-info":
                "(one standard drink contains approximately 17.74 mL of pure ethanol, equivalent to one average beer can)",
            calculate: "Calculate",
            "results-title": "Results:",
            "dilute-question":
                "Would you like to add a diluting agent (e.g., orange juice)?",
            yes: "Yes",
            no: "No",
            "dilute-volume-label":
                "Enter the volume (in mL) of the diluting agent:",
            "calculate-final": "Calculate Final Results",
            "warning-title": "Drink Responsibly",
            "warning-text":
                "To reduce the risk of harm from alcohol-related disease or injury, healthy men and women should drink no more than 10 standard drinks a week and no more than 4 standard drinks on any one day.",
            "info-link":
                'For more information, visit: <a href="https://www.health.gov.au/topics/alcohol/about-alcohol/how-much-alcohol-is-safe-to-drink" target="_blank">Australian Health Department</a>',
            "warning-drive":
                "<strong>Do not drive or operate heavy machinery after drinking!</strong>",
            "disclaimer-text":
                "This calculator is for educational purposes only. Always drink responsibly.",
            "volume-result-template":
                "You need {0} mL of your beverage to have {1} US standard drinks.",
            "abv-error": "Please enter a valid ABV between 0 and 100.",
            "drinks-error":
                "Please enter a positive number of standard drinks.",
            "dilute-error":
                "Please enter a non-negative volume for the diluting agent.",
            "final-results-template":
                "<h4>After adding {0} mL of diluting agent:</h4><ul><li>Total drink volume: {1} mL</li><li>Final ABV of the drink: {2}%</li></ul>",
            "after-adding": "After adding {0} mL of diluting agent:",
            "total-volume": "Total drink volume: {0} mL",
            "final-abv": "Final ABV of the drink: {0}%",
        },
        es: {
            "app-title": "💧 Calculadora de Tragos Estándar",
            "abv-label": "Ingrese el ABV de su bebida alcohólica (en %):",
            "drinks-label":
                "Ingrese el número de bebidas estándar de EE.UU. que desea:",
            "drink-info":
                "(una bebida estándar contiene aproximadamente 17.74 mL de etanol puro (alcohol), que es equivalente a 1 lata de cerveza promedio)",
            calculate: "Calcular",
            "results-title": "Resultados:",
            "dilute-question":
                "¿Desea agregar un agente diluyente (por ejemplo, jugo de naranja)?",
            yes: "Sí",
            no: "No",
            "dilute-volume-label":
                "Ingrese el volumen (en mL) del agente diluyente:",
            "calculate-final": "Calcular Resultados Finales",
            "warning-title": "Beba Responsablemente",
            "warning-text":
                "Para reducir el riesgo de daños por enfermedades o lesiones relacionadas con el alcohol, hombres y mujeres saludables no deberían beber más de 10 bebidas estándar a la semana y no más de 4 bebidas estándar en un solo día.",
            "info-link":
                'Para más información, visite: <a href="https://www.health.gov.au/topics/alcohol/about-alcohol/how-much-alcohol-is-safe-to-drink" target="_blank">Departamento de Salud de Australia</a>',
            "warning-drive":
                "<strong>¡No conduzca ni opere maquinaria pesada después de beber!</strong>",
            "disclaimer-text":
                "Esta calculadora es solo para fines educativos. Siempre beba responsablemente.",
            "volume-result-template":
                "Necesita {0} mL de su bebida para tener {1} bebidas estándar de EE.UU.",
            "abv-error": "Por favor ingrese un ABV válido entre 0 y 100.",
            "drinks-error":
                "Por favor ingrese un número positivo de bebidas estándar.",
            "dilute-error":
                "Por favor ingrese un volumen no negativo para el agente diluyente.",
            "final-results-template":
                "<h4>Después de agregar {0} mL de agente diluyente:</h4><ul><li>Volumen total de la bebida: {1} mL</li><li>ABV final de la bebida: {2}%</li></ul>",
            "after-adding": "Después de agregar {0} mL de agente diluyente:",
            "total-volume": "Volumen total de la bebida: {0} mL",
            "final-abv": "ABV final de la bebida: {0}%",
        },
    };

    // Format string utility (for translations with placeholders)
    String.prototype.format = function () {
        let formatted = this;
        for (let i = 0; i < arguments.length; i++) {
            let regexp = new RegExp("\\{" + i + "\\}", "gi");
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    // Set language function
    function setLanguage(lang) {
        currentLanguage = lang;

        // Set active button
        if (lang === "en") {
            enBtn.classList.add("active");
            esBtn.classList.remove("active");
        } else {
            esBtn.classList.add("active");
            enBtn.classList.remove("active");
        }

        // Update text for all translated elements
        document.getElementById("app-title").textContent =
            translations[lang]["app-title"];
        document.getElementById("abv-label").textContent =
            translations[lang]["abv-label"];
        document.getElementById("drinks-label").textContent =
            translations[lang]["drinks-label"];
        document.getElementById("drink-info").textContent =
            translations[lang]["drink-info"];
        document.getElementById("calculate").textContent =
            translations[lang]["calculate"];
        document.getElementById("results-title").textContent =
            translations[lang]["results-title"];
        document.getElementById("dilute-question").textContent =
            translations[lang]["dilute-question"];
        document.getElementById("yes-dilute").textContent =
            translations[lang]["yes"];
        document.getElementById("no-dilute").textContent =
            translations[lang]["no"];
        document.getElementById("dilute-volume-label").textContent =
            translations[lang]["dilute-volume-label"];
        document.getElementById("calculate-final").textContent =
            translations[lang]["calculate-final"];
        document.getElementById("warning-title").textContent =
            translations[lang]["warning-title"];
        document.getElementById("warning-text").textContent =
            translations[lang]["warning-text"];
        document.getElementById("info-link").innerHTML =
            translations[lang]["info-link"];
        document.getElementById("warning-drive").innerHTML =
            translations[lang]["warning-drive"];
        document.getElementById("disclaimer-text").textContent =
            translations[lang]["disclaimer-text"];

        // Update placeholders
        document.getElementById("beverage-abv").placeholder =
            lang === "en"
                ? "e.g., 40 for whiskey, 5 for beer"
                : "ej., 40 para whisky, 5 para cerveza";
        document.getElementById("standard-drinks").placeholder =
            lang === "en" ? "e.g., 1.5" : "ej., 1.5";
        document.getElementById("dilute-volume").placeholder =
            lang === "en" ? "e.g., 200" : "ej., 200";

        // Re-render results if they're visible
        if (resultDiv.style.display === "block") {
            const beverageAbv = parseFloat(
                document.getElementById("beverage-abv").value
            );
            const numStandardDrinks = parseFloat(
                document.getElementById("standard-drinks").value
            );
            const requiredVolume = computeRequiredBeverageVolume(
                beverageAbv,
                numStandardDrinks
            );

            document.getElementById("volume-result").textContent = translations[
                lang
            ]["volume-result-template"].format(
                requiredVolume.toFixed(2),
                numStandardDrinks
            );
        }

        // Re-render final results if they're visible
        if (document.getElementById("final-results").innerHTML !== "") {
            const beverageAbv = parseFloat(
                document.getElementById("beverage-abv").value
            );
            const numStandardDrinks = parseFloat(
                document.getElementById("standard-drinks").value
            );
            const diluteVolume = parseFloat(
                document.getElementById("dilute-volume").value
            );

            const requiredVolume = computeRequiredBeverageVolume(
                beverageAbv,
                numStandardDrinks
            );
            const totalVolume = requiredVolume + diluteVolume;
            const finalAbv = computeFinalAbv(
                requiredVolume,
                beverageAbv,
                diluteVolume
            );

            document.getElementById("final-results").innerHTML = translations[
                lang
            ]["final-results-template"].format(
                diluteVolume.toFixed(2),
                totalVolume.toFixed(2),
                finalAbv.toFixed(2)
            );
        }
    }

    // Language toggle event listeners
    enBtn.addEventListener("click", function () {
        setLanguage("en");
    });

    esBtn.addEventListener("click", function () {
        setLanguage("es");
    });

    // Main calculation function
    function computeRequiredBeverageVolume(abvPercent, numStandardDrinks) {
        const pureEthanolPerDrink = 17.74;
        const totalRequiredEthanol = numStandardDrinks * pureEthanolPerDrink;
        const requiredVolume = totalRequiredEthanol / (abvPercent / 100.0);
        return requiredVolume;
    }

    // Dilution calculation function
    function computeFinalAbv(beverageVolume, beverageAbv, diluteVolume) {
        const pureAlcohol = beverageVolume * (beverageAbv / 100.0);
        const totalVolume =
            parseFloat(beverageVolume) + parseFloat(diluteVolume);
        const finalAbv = (pureAlcohol / totalVolume) * 100.0;
        return finalAbv;
    }

    // Main calculation button
    calculateBtn.addEventListener("click", function () {
        const beverageAbv = parseFloat(
            document.getElementById("beverage-abv").value
        );
        const numStandardDrinks = parseFloat(
            document.getElementById("standard-drinks").value
        );

        // Validate inputs
        if (isNaN(beverageAbv) || beverageAbv <= 0 || beverageAbv > 100) {
            alert(translations[currentLanguage]["abv-error"]);
            return;
        }

        if (isNaN(numStandardDrinks) || numStandardDrinks <= 0) {
            alert(translations[currentLanguage]["drinks-error"]);
            return;
        }

        // Calculate and display results
        const requiredVolume = computeRequiredBeverageVolume(
            beverageAbv,
            numStandardDrinks
        );
        document.getElementById("volume-result").textContent = translations[
            currentLanguage
        ]["volume-result-template"].format(
            requiredVolume.toFixed(2),
            numStandardDrinks
        );

        // Show results and reset dilution section
        resultDiv.style.display = "block";
        dilutionSection.style.display = "none";
        document.getElementById("final-results").innerHTML = "";
    });

    // Dilution option buttons
    yesDiluteBtn.addEventListener("click", function () {
        dilutionSection.style.display = "block";
        document.getElementById("dilute-volume").value = "";
        document.getElementById("final-results").innerHTML = "";
    });

    noDiluteBtn.addEventListener("click", function () {
        dilutionSection.style.display = "none";
    });

    // Final calculation with dilution
    calculateFinalBtn.addEventListener("click", function () {
        const beverageAbv = parseFloat(
            document.getElementById("beverage-abv").value
        );
        const numStandardDrinks = parseFloat(
            document.getElementById("standard-drinks").value
        );
        const diluteVolume = parseFloat(
            document.getElementById("dilute-volume").value
        );

        if (isNaN(diluteVolume) || diluteVolume < 0) {
            alert(translations[currentLanguage]["dilute-error"]);
            return;
        }

        const requiredVolume = computeRequiredBeverageVolume(
            beverageAbv,
            numStandardDrinks
        );
        const totalVolume = requiredVolume + diluteVolume;
        const finalAbv = computeFinalAbv(
            requiredVolume,
            beverageAbv,
            diluteVolume
        );

        document.getElementById("final-results").innerHTML = translations[
            currentLanguage
        ]["final-results-template"].format(
            diluteVolume.toFixed(2),
            totalVolume.toFixed(2),
            finalAbv.toFixed(2)
        );
    });

    // Set initial language
    setLanguage("en");
});
