document.getElementById('btn-calcular').addEventListener('click', function() {
    const dieselInput = document.getElementById('diesel').value;
    const fertInput = document.getElementById('fertilizante').value;
    const mataInput = document.getElementById('mata').value;
    const pdInput = document.getElementById('plantio-direto').value;

    const diesel = parseFloat(dieselInput) || 0;
    const fertilizante = parseFloat(fertInput) || 0;
    const mata = parseFloat(mataInput) || 0;
    const plantioDireto = parseFloat(pdInput) || 0;

    const totalEmissao = (diesel * 2.6) + (fertilizante * 5.5);
    const totalSequestro = (mata * 4800) + (plantioDireto * 1200);

    const saldo = totalSequestro - totalEmissao;
    const creditosVerdes = Math.max(0, saldo / 1000);
    const valorFinanceiro = creditosVerdes * 50.00;

    document.getElementById('resultado').classList.remove('hidden');

    document.getElementById('txt-emissao').innerText = Math.round(totalEmissao).toLocaleString('pt-BR') + ' kg';
    document.getElementById('txt-sequestro').innerText = Math.round(totalSequestro).toLocaleString('pt-BR') + ' kg';

    const valorMaximo = Math.max(totalEmissao, totalSequestro, 1);
    const pctEmissao = (totalEmissao / valorMaximo) * 100;
    const pctSequestro = (totalSequestro / valorMaximo) * 100;

    document.getElementById('barra-emissao').style.width = pctEmissao + '%';
    document.getElementById('barra-sequestro').style.width = pctSequestro + '%';

    const statusBox = document.getElementById('status-box');
    const statusTitulo = document.getElementById('status-titulo');
    const statusDesc = document.getElementById('status-desc');
    const statusFinanceiro = document.getElementById('status-financeiro');

    if (saldo >= 0) {
        statusBox.className = "status-box positivo";
        statusTitulo.innerText = "🎉 Propriedade Sustentável!";
        statusDesc.innerText = "Balanço Ecológico Positivo. A propriedade retém os gases gerados e colabora com o clima do Paraná, acumulando um saldo de " + Math.round(saldo).toLocaleString('pt-BR') + " kg de CO₂ poupados.";
        statusFinanceiro.innerText = "💰 Créditos Gerados: " + creditosVerdes.toFixed(2) + " | Valor Estimado: R$ " + valorFinanceiro.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        statusFinanceiro.style.display = "inline-block";
    } else {
        statusBox.className = "status-box negativo";
        statusTitulo.innerText = "⚠️ Alerta de Emissões!";
        statusDesc.innerText = "Déficit Ecológico detectado. As emissões superam a captura em " + Math.abs(Math.round(saldo)).toLocaleString('pt-BR') + " kg de CO₂. Sugestão Agrinho: Adote mais áreas de Plantio Direto ou diminua adubos químicos solúveis.";
        statusFinanceiro.style.display = "none";
    }
});
