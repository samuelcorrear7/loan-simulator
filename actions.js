
/* =========================================
   LANGUAGE TRANSLATIONS
========================================= */

const translations = {

    en: {
        appTitle: "Loan Simulator",
        appSubtitle: "Calculate and plan your loan",
        mainHeading: "Loan Calculator",
        mainDescription: "Enter your loan details to calculate your monthly payments.",
        loanDetails: "Loan Details",
        loanAmount: "Loan Amount",
        interestRate: "Interest Rate (%)",
        rateType: "Interest Rate Type",
        monthlyRate: "Effective Monthly",
        annualRate: "Effective Annual",
        loanTerm: "Loan Term (Months)",
        calculate: "Calculate Loan",
        results: "Loan Summary",
        monthlyPayment: "Monthly Payment",
        totalPayment: "Total Payment",
        totalInterest: "Total Interest",
        loanInformation: "Loan Information",
        principal: "Principal Amount",
        monthlyRateLabel: "Monthly Interest Rate",
        duration: "Duration",
        amortizationTitle: "Amortization Schedule",
        amortizationDescription: "Detailed breakdown of each monthly payment.",
        paymentNumber: "Payment #",
        payment: "Payment",
        principalPaid: "Principal",
        interestPaid: "Interest",
        remainingBalance: "Remaining Balance",
        print: "Print",
        exportPDF: "Export PDF",
        exportCSV: "Export CSV",
        footer: "Loan Simulator | Financial Planning Tool",
        months: "months",
        invalidAmount: "Please enter a valid loan amount greater than zero.",
        invalidRate: "Please enter a valid interest rate of zero or greater.",
        invalidTerm: "Please enter a valid number of months (a positive whole number).",
        calculationError: "An error occurred while calculating the loan.",
        pdfError: "Could not generate the PDF. Please check your connection and try again.",
        pdfTitle: "LOAN SIMULATION REPORT",
        pdfLoanDetails: "LOAN DETAILS",
        pdfSummary: "LOAN SUMMARY",
        pdfPrincipal: "Principal Amount",
        pdfRate: "Monthly Interest Rate",
        pdfTerm: "Loan Term",
        pdfMonthly: "Monthly Payment",
        pdfTotal: "Total Payment",
        pdfInterest: "Total Interest",
        pdfSchedule: "AMORTIZATION SCHEDULE",
        pdfNumber: "Payment #",
        pdfPayment: "Payment",
        pdfPrincipalPaid: "Principal",
        pdfInterestPaid: "Interest",
        pdfBalance: "Remaining Balance",
        pdfPage: "Page"
    },

    es: {
        appTitle: "Simulador de Préstamos",
        appSubtitle: "Calcula y planifica tu préstamo",
        mainHeading: "Calculadora de Préstamos",
        mainDescription: "Ingresa los datos de tu préstamo para calcular tus cuotas mensuales.",
        loanDetails: "Detalles del Préstamo",
        loanAmount: "Monto del Préstamo",
        interestRate: "Tasa de Interés (%)",
        rateType: "Tipo de Tasa de Interés",
        monthlyRate: "Efectiva Mensual",
        annualRate: "Efectiva Anual",
        loanTerm: "Plazo del Préstamo (Meses)",
        calculate: "Calcular Préstamo",
        results: "Resumen del Préstamo",
        monthlyPayment: "Cuota Mensual",
        totalPayment: "Pago Total",
        totalInterest: "Intereses Totales",
        loanInformation: "Información del Préstamo",
        principal: "Capital Inicial",
        monthlyRateLabel: "Tasa de Interés Mensual",
        duration: "Duración",
        amortizationTitle: "Tabla de Amortización",
        amortizationDescription: "Desglose detallado de cada cuota mensual.",
        paymentNumber: "Cuota #",
        payment: "Pago",
        principalPaid: "Capital",
        interestPaid: "Interés",
        remainingBalance: "Saldo Restante",
        print: "Imprimir",
        exportPDF: "Exportar PDF",
        exportCSV: "Exportar CSV",
        footer: "Simulador de Préstamos | Herramienta de Planificación Financiera",
        months: "meses",
        invalidAmount: "Por favor, ingresa un monto de préstamo válido mayor que cero.",
        invalidRate: "Por favor, ingresa una tasa de interés válida de cero o mayor.",
        invalidTerm: "Por favor, ingresa un número entero positivo de meses.",
        calculationError: "Ocurrió un error al calcular el préstamo.",
        pdfError: "No se pudo generar el PDF. Verifica tu conexión e intenta nuevamente.",
        pdfTitle: "REPORTE DE SIMULACIÓN DE PRÉSTAMO",
        pdfLoanDetails: "DETALLES DEL PRÉSTAMO",
        pdfSummary: "RESUMEN DEL PRÉSTAMO",
        pdfPrincipal: "Capital Inicial",
        pdfRate: "Tasa de Interés Mensual",
        pdfTerm: "Plazo del Préstamo",
        pdfMonthly: "Cuota Mensual",
        pdfTotal: "Pago Total",
        pdfInterest: "Intereses Totales",
        pdfSchedule: "TABLA DE AMORTIZACIÓN",
        pdfNumber: "Cuota #",
        pdfPayment: "Pago",
        pdfPrincipalPaid: "Capital",
        pdfInterestPaid: "Interés",
        pdfBalance: "Saldo Restante",
        pdfPage: "Página"
    }

};


/* =========================================
   GLOBAL VARIABLES
========================================= */

let currentLanguage = "es";
let currentLoanData = null;


/* =========================================
   DOM ELEMENTS
========================================= */

const loanForm = document.getElementById("loanForm");
const languageSelect = document.getElementById("languageSelect");
const resultsSection = document.getElementById("resultsSection");
const errorMessage = document.getElementById("errorMessage");

const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const rateTypeInput = document.getElementById("rateType");
const loanTermInput = document.getElementById("loanTerm");

const amortizationBody = document.getElementById("amortizationBody");

const printButton = document.getElementById("printButton");
const pdfButton = document.getElementById("pdfButton");
const csvButton = document.getElementById("csvButton");


/* =========================================
   LANGUAGE MANAGEMENT
========================================= */

function translatePage() {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key = element.dataset.i18n;

        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }

    });

    document.documentElement.lang = currentLanguage;

    // Update existing results when language changes.
    if (currentLoanData) {
        displayResults(currentLoanData);
    }
}


/* =========================================
   NUMBER FORMATTING
========================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        currentLanguage === "es" ? "es-CO" : "en-US",
        {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    ).format(value);

}


function formatPercentage(value) {

    return new Intl.NumberFormat(
        currentLanguage === "es" ? "es-CO" : "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }
    ).format(value) + "%";

}


/* =========================================
   ERROR MANAGEMENT
========================================= */

function showError(message) {

    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    resultsSection.classList.add("hidden");

}


function clearError() {

    errorMessage.textContent = "";
    errorMessage.style.display = "none";

}


/* =========================================
   INPUT VALIDATION
========================================= */

function validateInputs(amount, rate, term) {

    const t = translations[currentLanguage];

    if (!Number.isFinite(amount) || amount <= 0) {
        showError(t.invalidAmount);
        return false;
    }

    if (!Number.isFinite(rate) || rate < 0) {
        showError(t.invalidRate);
        return false;
    }

    if (!Number.isSafeInteger(term) || term <= 0) {
        showError(t.invalidTerm);
        return false;
    }

    return true;

}


/* =========================================
   LOAN CALCULATION
========================================= */

function calculateLoan(event) {

    event.preventDefault();

    clearError();

    const principal = Number(loanAmountInput.value);
    const enteredRate = Number(interestRateInput.value);
    const term = Number(loanTermInput.value);
    const rateType = rateTypeInput.value;

    if (!validateInputs(principal, enteredRate, term)) {
        return;
    }

    try {

        let monthlyRate;

        // Convert effective annual rate into effective monthly rate.
        if (rateType === "annual") {

            const annualRate = enteredRate / 100;

            monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

        } else {

            monthlyRate = enteredRate / 100;

        }

        if (!Number.isFinite(monthlyRate)) {
            throw new Error("Invalid monthly interest rate.");
        }

        // Fixed monthly payment formula.
        let monthlyPayment;

        if (monthlyRate === 0) {

            monthlyPayment = principal / term;

        } else {

            monthlyPayment =
                principal *
                monthlyRate /
                (1 - Math.pow(1 + monthlyRate, -term));

        }

        if (!Number.isFinite(monthlyPayment)) {
            throw new Error("Invalid monthly payment.");
        }

        // Generate amortization schedule.
        const schedule = generateAmortization(
            principal,
            monthlyRate,
            term,
            monthlyPayment
        );

        const totalPayment = schedule.reduce(
            (sum, item) => sum + item.payment,
            0
        );

        const totalInterest = schedule.reduce(
            (sum, item) => sum + item.interest,
            0
        );

        currentLoanData = {
            principal,
            enteredRate,
            rateType,
            monthlyRate,
            term,
            monthlyPayment,
            totalPayment,
            totalInterest,
            schedule
        };

        displayResults(currentLoanData);

    } catch (error) {

        console.error(error);

        showError(translations[currentLanguage].calculationError);

    }

}


/* =========================================
   AMORTIZATION SCHEDULE
========================================= */

function generateAmortization(
    principal,
    monthlyRate,
    term,
    monthlyPayment
) {

    let balance = principal;

    const schedule = [];

    for (let month = 1; month <= term; month++) {

        const interest = balance * monthlyRate;

        let payment = monthlyPayment;

        // Adjust the final payment to eliminate any rounding difference.
        if (month === term) {
            payment = balance + interest;
        }

        const principalPaid = payment - interest;

        balance -= principalPaid;

        // Prevent small floating-point residuals.
        if (month === term || Math.abs(balance) < 0.000001) {
            balance = 0;
        }

        schedule.push({

            month,

            payment,

            principal: principalPaid,

            interest,

            balance

        });

    }

    return schedule;

}


/* =========================================
   DISPLAY RESULTS
========================================= */

function displayResults(data) {

    const t = translations[currentLanguage];

    resultsSection.classList.remove("hidden");

    document.getElementById("monthlyPaymentValue").textContent =
        formatCurrency(data.monthlyPayment);

    document.getElementById("totalPaymentValue").textContent =
        formatCurrency(data.totalPayment);

    document.getElementById("totalInterestValue").textContent =
        formatCurrency(data.totalInterest);

    document.getElementById("principalValue").textContent =
        formatCurrency(data.principal);

    document.getElementById("monthlyRateValue").textContent =
        formatPercentage(data.monthlyRate * 100);

    document.getElementById("durationValue").textContent =
        `${data.term} ${t.months}`;

    renderAmortizationTable(data.schedule);

}


/* =========================================
   RENDER AMORTIZATION TABLE
========================================= */

function renderAmortizationTable(schedule) {

    amortizationBody.innerHTML = "";

    schedule.forEach(item => {

        const row = document.createElement("tr");

        const values = [

            item.month,

            formatCurrency(item.payment),

            formatCurrency(item.principal),

            formatCurrency(item.interest),

            formatCurrency(item.balance)

        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        amortizationBody.appendChild(row);

    });

}


/* =========================================
   PRINT FUNCTION
========================================= */

function printResults() {

    if (!currentLoanData) {
        return;
    }

    window.print();

}


/* =========================================
   PDF EXPORT FUNCTION
========================================= */

function exportPDF() {

    if (!currentLoanData) {
        return;
    }

    const t = translations[currentLanguage];

    try {

        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error("jsPDF library is unavailable.");
        }

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });

        const data = currentLoanData;

        // Document title.
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(16, 29, 53);

        doc.text(t.pdfTitle, 14, 18);

        // Gold separator.
        doc.setDrawColor(214, 173, 85);
        doc.setLineWidth(1);

        doc.line(14, 23, 283, 23);

        // Loan details.
        doc.setFontSize(12);
        doc.setTextColor(16, 29, 53);

        doc.text(t.pdfLoanDetails, 14, 33);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 70, 85);

        doc.text(
            `${t.pdfPrincipal}: ${formatCurrency(data.principal)}`,
            14,
            42
        );

        doc.text(
            `${t.pdfRate}: ${formatPercentage(data.monthlyRate * 100)}`,
            14,
            49
        );

        doc.text(
            `${t.pdfTerm}: ${data.term} ${t.months}`,
            14,
            56
        );

        // Loan summary.
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(16, 29, 53);

        doc.text(t.pdfSummary, 150, 33);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            `${t.pdfMonthly}: ${formatCurrency(data.monthlyPayment)}`,
            150,
            42
        );

        doc.text(
            `${t.pdfTotal}: ${formatCurrency(data.totalPayment)}`,
            150,
            49
        );

        doc.text(
            `${t.pdfInterest}: ${formatCurrency(data.totalInterest)}`,
            150,
            56
        );

        // Amortization schedule title.
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(16, 29, 53);

        doc.text(t.pdfSchedule, 14, 70);

        // Table data.
        const tableRows = data.schedule.map(item => [

            item.month,

            formatCurrency(item.payment),

            formatCurrency(item.principal),

            formatCurrency(item.interest),

            formatCurrency(item.balance)

        ]);

        // Generate PDF table.
        doc.autoTable({

            startY: 75,

            head: [[

                t.pdfNumber,

                t.pdfPayment,

                t.pdfPrincipalPaid,

                t.pdfInterestPaid,

                t.pdfBalance

            ]],

            body: tableRows,

            theme: "grid",

            styles: {
                font: "helvetica",
                fontSize: 8,
                cellPadding: 3,
                textColor: [38, 52, 75]
            },

            headStyles: {
                fillColor: [16, 29, 53],
                textColor: [255, 255, 255],
                fontStyle: "bold"
            },

            alternateRowStyles: {
                fillColor: [245, 247, 250]
            },

            margin: {
                left: 14,
                right: 14,
                bottom: 18
            },

            didDrawPage: function () {

                const pageNumber = doc.internal.getNumberOfPages();

                const pageHeight =
                    doc.internal.pageSize.getHeight();

                doc.setFontSize(8);
                doc.setTextColor(120, 130, 145);

                doc.text(
                    `${t.pdfPage} ${pageNumber}`,
                    283,
                    pageHeight - 8,
                    { align: "right" }
                );

            }

        });

        // Save document.
        const filename =
            currentLanguage === "es"
                ? "simulacion_prestamo.pdf"
                : "loan_simulation.pdf";

        doc.save(filename);

    } catch (error) {

        console.error(error);

        alert(t.pdfError);

    }

}


/* =========================================
   CSV EXPORT FUNCTION
========================================= */

function exportCSV() {

    if (!currentLoanData) {
        return;
    }

    const t = translations[currentLanguage];

    const data = currentLoanData;

    const headers = [

        t.pdfNumber,

        t.pdfPayment,

        t.pdfPrincipalPaid,

        t.pdfInterestPaid,

        t.pdfBalance

    ];

    const rows = data.schedule.map(item => [

        item.month,

        item.payment.toFixed(2),

        item.principal.toFixed(2),

        item.interest.toFixed(2),

        item.balance.toFixed(2)

    ]);

    const csvContent = [

        headers.join(";"),

        ...rows.map(row => row.join(";"))

    ].join("\n");

    const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        currentLanguage === "es"
            ? "tabla_amortizacion.csv"
            : "amortization_schedule.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


/* =========================================
   EVENT LISTENERS
========================================= */

// Calculate loan.
loanForm.addEventListener("submit", calculateLoan);

// Change language.
languageSelect.addEventListener("change", function () {

    currentLanguage = this.value;

    translatePage();

});

// Print results.
printButton.addEventListener("click", printResults);

// Export PDF.
pdfButton.addEventListener("click", exportPDF);

// Export CSV.
csvButton.addEventListener("click", exportCSV);


/* =========================================
   INITIALIZATION
========================================= */

translatePage();
