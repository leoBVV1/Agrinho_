document.getElementById('btn-calcular').addEventListener('click', function() {
    // 1. Captura os valores dos inputs
    const diesel = parseFloat(document.getElementById('diesel').value) || 0;
    const mata = parseFloat(document.getElementById('mata').value) || 0;

    // 2. Fórmulas matemáticas (Fatores oficiais médios de emissão/sequestro)
    const totalEmissao = diesel * 2.6;       // 2.6 kg de CO2 por litro de diesel
    const totalSequestro = mata * 4800;      // 4800 kg de CO2 absorvidos por hectare de mata/ano

    const saldo = totalSequestro - totalEmissao;
    const creditosVerdes = Math.max(0, saldo / 1000); // 1 Crédito = 1000kg poupados

    // 3. Exibe a tela de resultados
    const resultadoSection = document.getElementById('resultado');
    resultadoSection.classList.remove('hidden');

    // 4. Atualiza os textos na tela
    document.getElementById('txt-emissao').innerText = `${totalEmissao.toLocaleString('pt-BR')} kg`;
    document.getElementById('txt-sequestro').innerText = `${totalSequestro.toLocaleString('pt-BR')} kg`;

    const statusBox = document.getElementById('status-box');
    const statusTitulo = document.getElementById('status-titulo');
    const statusDesc = document.getElementById('status-desc');

    // 5. Lógica de decisão do Balanço
    if (saldo >= 0) {
        statusBox.className = "status-box positivo";
        statusTitulo.innerText = "🎉 Propriedade Sustentável!";
        statusDesc.innerText = `A fazenda retém mais gases poluentes do que emite. Parabéns! Potencial para gerar ${creditosVerdes.toFixed(2)} Créditos de Carbono para o mercado.`;
    } else {
        statusBox.className = "status-box negativo";
        statusTitulo.innerText = "⚠️ Alerta de Impacto!";
        statusDesc.innerText = `As emissões estão maiores que a absorção por uma diferença de ${Math.abs(saldo).toLocaleString('pt-BR')} kg de CO₂. Dica Agrinho: Amplie as áreas de plantio direto e preserve suas matas nativas ciliares!`;
    }
});
