let meuGrafico = null; // Guarda a instância do gráfico para poder resetar

document.getElementById('btn-calcular').addEventListener('click', function() {
    // 1. Captura todos os novos inputs
    const diesel = parseFloat(document.getElementById('diesel').value) || 0;
    const fertilizante = parseFloat(document.getElementById('fertilizante').value) || 0;
    const mata = parseFloat(document.getElementById('mata').value) || 0;
    const plantioDireto = parseFloat(document.getElementById('plantio-direto').value) || 0;

    // 2. Fórmulas Matemáticas Avançadas de Impacto
    const emissaoDiesel = diesel * 2.6;                 // 2.6 kg de CO2 por litro
    const emissaoFertilizante = fertilizante * 5.5;     // 5.5 kg de CO2eq por kg de nitrogênio químico
    const totalEmissao = emissaoDiesel + emissaoFertilizante;

    const sequestroMata = mata * 4800;                  // 4800 kg absorvidos por hectare de mata nativa/ano
    const sequestroPlantio = plantioDireto * 1200;      // 1200 kg absorvidos por hectare com palhada/ano
    const totalSequestro = sequestroMata + sequestroPlantio;

    const saldo = totalSequestro - totalEmissao;
    const creditosVerdes = Math.max(0, saldo / 1000);   // 1 Crédito = 1000 kg de CO2 retido
    const valorFinanceiroEstimado = creditosVerdes * 50.00; // Média de R$ 50,00 por crédito

    // 3. Exibe a seção oculta de resultados
    document.getElementById('resultado').classList.remove('hidden');

    // 4. Atualiza os componentes textuais básicos
    document.getElementById('txt-emissao').innerText = `${Math.round(totalEmissao).toLocaleString('pt-BR')} kg`;
    document.getElementById('txt-sequestro').innerText = `${Math.round(totalSequestro).toLocaleString('pt-BR')} kg`;

    const statusBox = document.getElementById('status-box');
    const statusTitulo = document.getElementById('status-titulo');
    const statusDesc = document.getElementById('status-desc');
    const statusFinanceiro = document.getElementById('status-financeiro');

    // 5. Lógica de Balanço e Cálculo Financeiro das Metas
    if (saldo >= 0) {
        statusBox.className = "status-box positivo";
        statusTitulo.innerText = "🎉 Propriedade Sustentável!";
        statusDesc.innerText = `A fazenda retém mais gases poluentes do que emite através do manejo sustentável. Potencial para certificar ${creditosVerdes.toFixed(2)} Créditos de Carbono.`;
        statusFinanceiro.innerText = `💰 Retorno Financeiro Estimado: R$ ${valorFinanceiroEstimado.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        statusFinanceiro.style.display = "inline-block";
    } else {
        statusBox.className = "status-box negativo";
        statusTitulo.innerText = "⚠️ Alerta de Emissões!";
        statusDesc.innerText = `As emissões superam a captura em ${Math.abs(Math.round(saldo)).toLocaleString('pt-BR')} kg de CO₂. Expanda as áreas de Plantio Direto ou diminua os insumos solúveis químicos para equilibrar a balança.`;
        statusFinanceiro.style.display = "none";
    }

    // 6. Atualização e Renderização Dinâmica do Gráfico (Chart.js)
    if (meuGrafico) meuGrafico.destroy(); // Apaga o gráfico antigo se houver

    const ctx = document.getElementById('graficoCarbono').getContext('2d');
    meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Poluição Gerada (Emissões)', 'Carbono Retido (Sequestro)'],
            datasets: [{
                label: 'Balanço de Carbono (kg CO₂)',
                data: [totalEmissao, totalSequestro],
                backgroundColor: ['#e74c3c', '#27ae60'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});

// 7. Geração do Relatório PDF (html2pdf.js)
document.getElementById('btn-pdf').addEventListener('click', function() {
    const elemento = document.getElementById('conteudo-projeto');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnPdf = document.getElementById('btn-pdf');

    // Esconde os botões temporariamente para não saírem no arquivo gerado
    btnCalcular.style.opacity = '0';
    btnPdf.style.opacity = '0';

    const opcoes = {
        margin:       10,
        filename:     'Relatorio_EcoCarbono_Agrinho.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opcoes).from(elemento).save().then(() => {
        // Torna os botões visíveis novamente após salvar
        btnCalcular.style.opacity = '1';
        btnPdf.style.opacity = '1';
    });
});
