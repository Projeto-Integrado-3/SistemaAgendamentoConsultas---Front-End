
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    renderExames(tabName);
}

const exames = [
    { id: 1, tipo: 'Hemograma', data: '2025-04-15', status: 'pendente', paciente: 'João Silva', medico: 'Dr. Santos' },
    { id: 2, tipo: 'Raio-X', data: '2025-04-16', status: 'agendado', paciente: 'Maria Santos', medico: 'Dra. Lima' },
    { id: 3, tipo: 'Ultrassom', data: '2025-04-14', status: 'concluido', paciente: 'Pedro Alves', medico: 'Dr. Costa' }
];

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function renderExames(status = 'pendentes') {
    const container = document.getElementById(status);
    const filteredExames = exames.filter(exame => exame.status === status.slice(0, -1));
    
    container.innerHTML = filteredExames.map(exame => `
        <div class="exame-item">
            <div class="exame-info">
                <h3>${exame.tipo}</h3>
                <p>Paciente: ${exame.paciente}</p>
                <p>Médico: ${exame.medico}</p>
                <p>Data: ${formatDate(exame.data)}</p>
            </div>
            <div class="exame-actions">
                <button class="edit-btn" onclick="editExame(${exame.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-btn" onclick="deleteExame(${exame.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('') || '<p class="no-results">Nenhum exame encontrado</p>';
}

function editExame(id) {
    // Implementar lógica de edição
    console.log('Editar exame:', id);
}

function deleteExame(id) {
    if (confirm('Tem certeza que deseja excluir este exame?')) {
        const index = exames.findIndex(exame => exame.id === id);
        if (index !== -1) {
            exames.splice(index, 1);
            renderExames(document.querySelector('.tab-content.active').id);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderExames('pendentes');
    
    const searchInput = document.getElementById('searchExam');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const activeTab = document.querySelector('.tab-content.active').id;
        
        const filteredExames = exames.filter(exame => 
            (exame.status === activeTab.slice(0, -1)) &&
            (exame.tipo.toLowerCase().includes(searchTerm) ||
             exame.paciente.toLowerCase().includes(searchTerm) ||
             exame.medico.toLowerCase().includes(searchTerm))
        );
        
        renderFilteredExames(activeTab, filteredExames);
    });
});

function renderFilteredExames(containerId, filteredExames) {
    const container = document.getElementById(containerId);
    container.innerHTML = filteredExames.map(exame => `
        <div class="exame-item">
            <div class="exame-info">
                <h3>${exame.tipo}</h3>
                <p>Paciente: ${exame.paciente}</p>
                <p>Médico: ${exame.medico}</p>
                <p>Data: ${formatDate(exame.data)}</p>
            </div>
            <div class="exame-actions">
                <button class="edit-btn" onclick="editExame(${exame.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-btn" onclick="deleteExame(${exame.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('') || '<p class="no-results">Nenhum exame encontrado</p>';
}
