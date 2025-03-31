
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

const exames = [
    { id: 1, tipo: 'Hemograma', data: '2025-04-15', status: 'pendente', paciente: 'João Silva' },
    { id: 2, tipo: 'Raio-X', data: '2025-04-16', status: 'agendado', paciente: 'Maria Santos' },
    { id: 3, tipo: 'Ultrassom', data: '2025-04-14', status: 'concluido', paciente: 'Pedro Alves' }
];

function renderExames() {
    const pendentesDiv = document.getElementById('pendentes');
    const agendadosDiv = document.getElementById('agendados');
    const concluidosDiv = document.getElementById('concluidos');
    
    pendentesDiv.innerHTML = '';
    agendadosDiv.innerHTML = '';
    concluidosDiv.innerHTML = '';
    
    exames.forEach(exame => {
        const exameElement = document.createElement('div');
        exameElement.className = 'exame-item';
        exameElement.innerHTML = `
            <h3>${exame.tipo}</h3>
            <p>Paciente: ${exame.paciente}</p>
            <p>Data: ${new Date(exame.data).toLocaleDateString()}</p>
        `;
        
        switch(exame.status) {
            case 'pendente':
                pendentesDiv.appendChild(exameElement);
                break;
            case 'agendado':
                agendadosDiv.appendChild(exameElement);
                break;
            case 'concluido':
                concluidosDiv.appendChild(exameElement);
                break;
        }
    });
}

document.addEventListener('DOMContentLoaded', renderExames);
