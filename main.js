document.getElementById('btn-calcular').addEventListener('click', function() {
    // Captura os valores digitados
    const diesel = parseFloat(document.getElementById('diesel').value) || 0;
    const fertilizante = parseFloat(document.getElementById('fertilizante').value) || 0;
    const mata = parseFloat(document.getElementById('mata').value) || 0;
    const plantioDireto = parseFloat(document.getElementById('plantio-direto').value) || 0;

    // Fórmulas matemáticas lógicas de emissão e sequestro
    const totalEmissao = (diesel * 2.6) + (fertilizante * 5.5);
    const totalSequestro = (mata * 4800) + (plantioDireto * 1200);

    const saldo = totalSequestro - totalEmissao;
    const creditosVerdes = Math.max(0, saldo / 1000);
    const valorFinanceiro = creditosVerdes * 50.00;

    // Torna os resultados visíveis
    document.getElementById('resultado').classList.remove('hidden');

    // Atualiza os cards textuais
    document.getElementById('txt-emissao').innerText = `${Math.round(totalEmissao).toLocaleString('pt-BR')} kg`;
    document.getElementById('txt-sequestro').innerText = `${Math.round(totalSequestro).toLocaleString('pt-BR')} kg`;

    // Lógica do Gráfico Responsivo Nativo (Preenche a barra de 0% a 100% proporcionalmente)
    const valorMaximo = Math.max(totalEmissao, totalSequestro, 1); // Evita divisão por zero
    const pctEmissao = (totalEmissao / valorMaximo) * 100;
    const pctSequestro = (totalSequestro / valorMaximo) * 100;

    document.getElementById('barra-emissao').style.width = `${pctEmissao}%`;
    document.getElementById('barra-sequestro').style.width = `${pctSequestro}%`;

    // Atualiza o painel de status e dicas
    const statusBox = document.getElementById('status-box');
    const statusTitulo = document.getElementById('status-titulo');
    const statusDesc = document.getElementById('status-desc');
    const statusFinanceiro = document.getElementById('status-financeiro');

    if (saldo >= 0) {
        statusBox.className = "status-box positivo";
        statusTitulo.innerText = "🎉 Propriedade Sustentável!";
        statusDesc.innerText = `Balanço Ecológico Positivo. A propriedade retém os gases gerados e gera ${creditosVerdes.toFixed(2)} Créditos de Carbono.`;
        statusFinanceiro.innerText = `💰 Valor de Mercado Estimado: R$ ${valorFinanceiro.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        statusFinanceiro.style.display = "inline-block";
    } else {
        statusBox.className = "status-box negativo";
        statusTitulo.innerText = "⚠️ Alerta de Emissões!";
        statusDesc.innerText = `Déficit Ecológico de ${Math.abs(Math.round(saldo)).toLocaleString('pt-BR')} kg de CO₂. Sugestão Agrinho: Aumente a área de plantio direto para reter mais carbono no solo.`;
        statusFinanceiro.style.display = "none";
    }
});
