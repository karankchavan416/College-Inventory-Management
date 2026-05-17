let inventory = [
    { id: 1, name: 'Desktop Computer', category: 'Electronics', quantity: 45, value: 850, department: 'General' },
    { id: 2, name: 'Projector', category: 'Electronics', quantity: 25, value: 650, department: 'General' },
    { id: 3, name: 'Whiteboard', category: 'Furniture', quantity: 60, value: 200, department: 'General' },
    { id: 4, name: 'Student Desk', category: 'Furniture', quantity: 850, value: 120, department: 'General' },
    { id: 5, name: 'Office Chair', category: 'Furniture', quantity: 320, value: 180, department: 'General' },
    { id: 6, name: 'Microscope', category: 'Lab Equipment', quantity: 35, value: 1200, department: 'General' },
    { id: 7, name: 'Bunsen Burner', category: 'Lab Equipment', quantity: 50, value: 45, department: 'General' },
    { id: 8, name: 'Lab Bench', category: 'Furniture', quantity: 24, value: 850, department: 'General' },
    { id: 9, name: 'Beakers Set', category: 'Lab Equipment', quantity: 80, value: 65, department: 'General' },
    { id: 10, name: 'Safety Goggles', category: 'Safety Equipment', quantity: 200, value: 12, department: 'General' },
    { id: 11, name: 'Library Books', category: 'Books', quantity: 45000, value: 35, department: 'General' },
    { id: 12, name: 'Study Table', category: 'Furniture', quantity: 120, value: 250, department: 'General' },
    { id: 13, name: 'Reading Lamp', category: 'Electronics', quantity: 80, value: 45, department: 'General' },
    { id: 14, name: 'Bookshelf', category: 'Furniture', quantity: 180, value: 320, department: 'General' },
    { id: 15, name: 'Basketball', category: 'Sports', quantity: 45, value: 35, department: 'General' },
    { id: 16, name: 'Football', category: 'Sports', quantity: 30, value: 40, department: 'General' },
    { id: 17, name: 'Tennis Racket', category: 'Sports', quantity: 25, value: 85, department: 'General' },
    { id: 18, name: 'Treadmill', category: 'Sports', quantity: 12, value: 1800, department: 'General' },
    { id: 19, name: 'Weight Set', category: 'Sports', quantity: 8, value: 650, department: 'General' },
    { id: 20, name: 'Printer', category: 'Electronics', quantity: 35, value: 350, department: 'General' },
    { id: 21, name: 'Scanner', category: 'Electronics', quantity: 18, value: 280, department: 'General' },
    { id: 22, name: 'Filing Cabinet', category: 'Furniture', quantity: 65, value: 420, department: 'General' },
    { id: 23, name: 'Conference Table', category: 'Furniture', quantity: 15, value: 950, department: 'General' },
    { id: 24, name: 'Microphone', category: 'Electronics', quantity: 22, value: 150, department: 'General' },
    { id: 25, name: 'Speaker System', category: 'Electronics', quantity: 18, value: 580, department: 'General' },
    { id: 26, name: 'Video Camera', category: 'Electronics', quantity: 8, value: 1200, department: 'General' },
    { id: 27, name: 'Laptop', category: 'Electronics', quantity: 120, value: 950, department: 'General' },
    { id: 28, name: 'Air Conditioner', category: 'Utilities', quantity: 85, value: 850, department: 'General' },
    { id: 29, name: 'Water Dispenser', category: 'Utilities', quantity: 45, value: 320, department: 'General' },
    { id: 30, name: 'Fire Extinguisher', category: 'Safety Equipment', quantity: 150, value: 65, department: 'General' }
];

// Ensure each item has a history array
inventory.forEach(i => { if (!Array.isArray(i.history)) i.history = []; });

// Department Allocations - tracks items shared with departments
let allocations = [];

let requests = [
    { id: 1, studentName: 'Rahul Sharma', studentId: 'CS2023001', department: 'Computer Science', itemName: 'Laptop', quantity: 1, purpose: 'For final year project development', requiredDate: '2026-01-20', status: 'Pending', requestDate: '2026-01-10' },
    { id: 2, studentName: 'Priya Patel', studentId: 'EC2023045', department: 'Electronics', itemName: 'Oscilloscope', quantity: 1, purpose: 'Circuit analysis lab work', requiredDate: '2026-01-15', status: 'Approved', requestDate: '2026-01-08' },
    { id: 3, studentName: 'Amit Kumar', studentId: 'ME2022078', department: 'Mechanical', itemName: 'Projector', quantity: 1, purpose: 'Technical seminar presentation', requiredDate: '2026-01-18', status: 'Fulfilled', requestDate: '2026-01-05' }
];

let searchTerm = '';
let filterCategory = 'All';
let filterDepartment = 'All';
let editingId = null;
let requestSearchTerm = '';
let statusFilter = 'All';
let allocationSearchTerm = '';
let allocationDeptFilter = 'All';
let currentTab = 'inventory';
let isAdmin = false;
const ADMIN_PASSWORD = 'admin123';
let currentUser = { id: null, name: null };

// Load session data from localStorage
function loadSessionData() {
    const savedAdmin = localStorage.getItem('isAdmin');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedAdmin === 'true') {
        isAdmin = true;
    }
    
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch(e) {
            currentUser = { id: null, name: null };
        }
    }
}

// Save session data to localStorage
function saveSessionData() {
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// ============ AUTO-SAVE & BACKUP FUNCTIONS ============
function autoSaveBackup() {
    try {
        const backupData = {
            inventory: inventory,
            requests: requests,
            allocations: allocations,
            timestamp: new Date().toISOString(),
            version: '2.0'
        };
        
        localStorage.setItem('inventoryBackup', JSON.stringify(backupData));
        
        const lastBackupMenuEl = document.getElementById('lastBackupTimeMenu');
        const time = new Date().toLocaleTimeString();
        
        if (lastBackupMenuEl) {
            lastBackupMenuEl.textContent = `Last backup: ${time}`;
        }
        
        let backupHistory = [];
        try {
            const savedHistory = localStorage.getItem('backupHistory');
            backupHistory = savedHistory ? JSON.parse(savedHistory) : [];
        } catch (e) {
            backupHistory = [];
        }
        
        backupHistory.unshift({
            timestamp: new Date().toISOString(),
            itemCount: inventory.length,
            requestCount: requests.length,
            allocationCount: allocations.length
        });
        
        if (backupHistory.length > 5) {
            backupHistory = backupHistory.slice(0, 5);
        }
        
        localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
        
    } catch (e) {
        console.error('Backup failed:', e);
    }
}

function restoreFromBackup() {
    try {
        const backupData = localStorage.getItem('inventoryBackup');
        if (!backupData) {
            alert('No backup found to restore');
            return false;
        }
        
        const backup = JSON.parse(backupData);
        
        if (confirm(`Restore backup from ${new Date(backup.timestamp).toLocaleString()}? This will overwrite current data.`)) {
            inventory = backup.inventory || [];
            requests = backup.requests || [];
            allocations = backup.allocations || [];
            initializeCategories();
            updateInventoryDisplay();
            updateRequestsDisplay();
            updateAllocationsDisplay();
            alert('Data restored from backup successfully!');
            return true;
        }
    } catch (e) {
        console.error('Restore failed:', e);
        alert('Failed to restore backup');
        return false;
    }
}

function showBackupHistory() {
    try {
        let backupHistory = [];
        const savedHistory = localStorage.getItem('backupHistory');
        if (savedHistory) {
            backupHistory = JSON.parse(savedHistory);
        }
        
        if (backupHistory.length === 0) {
            alert('No backup history available yet');
            return;
        }
        
        let historyText = 'Backup History (Last 5):\n\n';
        backupHistory.forEach((backup, index) => {
            const date = new Date(backup.timestamp);
            historyText += `${index + 1}. ${date.toLocaleString()}\n   Items: ${backup.itemCount} | Requests: ${backup.requestCount} | Allocations: ${backup.allocationCount || 0}\n\n`;
        });
        
        alert(historyText);
    } catch (e) {
        console.error('Error showing backup history:', e);
        alert('Error loading backup history');
    }
}

function downloadBackup() {
    try {
        const backupData = {
            inventory: inventory,
            requests: requests,
            allocations: allocations,
            timestamp: new Date().toISOString(),
            version: '2.0'
        };
        
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        const timestamp = new Date().toISOString().slice(0, 10);
        link.setAttribute('href', url);
        link.setAttribute('download', `inventory_backup_${timestamp}.json`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Backup downloaded successfully!');
    } catch (e) {
        console.error('Download backup failed:', e);
        alert('Failed to download backup');
    }
}

function importBackupFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            
            if (!backupData.inventory || !Array.isArray(backupData.inventory)) {
                alert('Invalid backup file format');
                return;
            }
            
            if (confirm(`Restore backup from ${new Date(backupData.timestamp).toLocaleString()}? This will overwrite current data.`)) {
                inventory = backupData.inventory;
                requests = backupData.requests || [];
                allocations = backupData.allocations || [];
                initializeCategories();
                updateInventoryDisplay();
                updateRequestsDisplay();
                updateAllocationsDisplay();
                alert('Backup imported successfully!');
            }
        } catch (e) {
            alert('Failed to import backup file: ' + e.message);
        }
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', () => {
    loadSessionData();
    initializeCategories();
    updateInventoryDisplay();
    updateRequestsDisplay();
    updateAllocationsDisplay();
    attachEventListeners();
    updateCurrentUserIndicator();
    updateAdminUI();
    
    autoSaveBackup();
    setInterval(autoSaveBackup, 30000);
});

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'inventory') {
        document.querySelector('.nav-tab:nth-child(1)').classList.add('active');
        document.getElementById('inventoryTab').classList.add('active');
        updateInventoryDisplay();
    } else if (tab === 'allocations') {
        document.querySelector('.nav-tab:nth-child(2)').classList.add('active');
        document.getElementById('allocationsTab').classList.add('active');
        updateAllocationsDisplay();
    } else {
        document.querySelector('.nav-tab:nth-child(3)').classList.add('active');
        document.getElementById('requestsTab').classList.add('active');
        updateRequestsDisplay();
    }
}

function initializeCategories() {
    const categories = ['All', ...new Set(inventory.map(item => item.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = categories.map(cat => 
        `<option value="${cat}">${cat}</option>`
    ).join('');
    
    const departments = ['All', ...new Set(inventory.map(item => item.department))].sort();
    const departmentFilter = document.getElementById('departmentFilter');
    if (departmentFilter) {
        departmentFilter.innerHTML = departments.map(dept => 
            `<option value="${dept}">${dept}</option>`
        ).join('');
    }
    
    const allocationDeptFilter = document.getElementById('allocationDeptFilter');
    if (allocationDeptFilter) {
        const allDepts = ['All', 'Computer Science', 'Electronics', 'Chemistry', 'Biology', 'Library', 'Sports', 'Management'].sort();
        allocationDeptFilter.innerHTML = allDepts.map(dept => 
            `<option value="${dept}">${dept}</option>`
        ).join('');
    }
}

function getDepartments() {
    return [...new Set(inventory.map(item => item.department || 'General'))].sort();
}

function attachEventListeners() {
    document.addEventListener('click', (e) => {
        const adminBtn = document.getElementById('adminLoginBtn');
        const adminPanel = document.getElementById('adminPanel');
        const userBtn = document.getElementById('setUserBtn');
        const userPanel = document.getElementById('userPanel');
        
        if (adminBtn && adminPanel && userBtn && userPanel) {
            if (!adminBtn.contains(e.target) && !adminPanel.contains(e.target)) {
                adminPanel.style.display = 'none';
            }
            if (!userBtn.contains(e.target) && !userPanel.contains(e.target)) {
                userPanel.style.display = 'none';
            }
        }
    });

    // Inventory search and filter
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        updateInventoryDisplay();
    });

    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterCategory = e.target.value;
        updateInventoryDisplay();
    });

    document.getElementById('departmentFilter').addEventListener('change', (e) => {
        filterDepartment = e.target.value;
        updateInventoryDisplay();
    });

    // Export buttons
    document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPdf);
    document.getElementById('deptReportBtn').addEventListener('click', showDeptReport);

    // Add item button
    document.getElementById('addButton').addEventListener('click', () => {
        if (!isAdmin) { 
            alert('Only admins can add inventory items.'); 
            return; 
        }
        const addForm = document.getElementById('addFormContainer');
        addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('saveNewButton').addEventListener('click', addNewItem);
    document.getElementById('cancelButton').addEventListener('click', () => {
        document.getElementById('addFormContainer').style.display = 'none';
        clearAddForm();
    });

    // Allocation listeners
    document.getElementById('allocationSearchInput').addEventListener('input', (e) => {
        allocationSearchTerm = e.target.value;
        updateAllocationsDisplay();
    });

    document.getElementById('allocationDeptFilter').addEventListener('change', (e) => {
        allocationDeptFilter = e.target.value;
        updateAllocationsDisplay();
    });

    document.getElementById('shareItemButton').addEventListener('click', () => {
        if (!isAdmin) { 
            alert('Only admins can share items.'); 
            return; 
        }
        const shareForm = document.getElementById('shareFormContainer');
        shareForm.style.display = shareForm.style.display === 'none' ? 'block' : 'none';
        populateShareItemSelect();
    });

    document.getElementById('confirmShareButton').addEventListener('click', confirmShare);
    document.getElementById('cancelShareButton').addEventListener('click', () => {
        document.getElementById('shareFormContainer').style.display = 'none';
        clearShareForm();
    });

    document.getElementById('viewDefaultItemsBtn').addEventListener('click', showDefaultItemsReport);

    // Request form listeners
    document.getElementById('requestSearchInput').addEventListener('input', (e) => {
        requestSearchTerm = e.target.value;
        updateRequestsDisplay();
    });

    document.getElementById('statusFilter').addEventListener('change', (e) => {
        statusFilter = e.target.value;
        updateRequestsDisplay();
    });

    document.getElementById('newRequestButton').addEventListener('click', () => {
        const requestForm = document.getElementById('requestFormContainer');
        requestForm.style.display = requestForm.style.display === 'none' ? 'block' : 'none';
    });

    // Admin/User authentication
    const adminBtn = document.getElementById('adminLoginBtn');
    if (adminBtn) adminBtn.addEventListener('click', showAdminPanel);
    const adminSubmit = document.getElementById('adminSubmitBtn');
    if (adminSubmit) adminSubmit.addEventListener('click', adminLoginSubmit);
    const adminCancel = document.getElementById('adminCancelBtn');
    if (adminCancel) adminCancel.addEventListener('click', () => { 
        document.getElementById('adminPanel').style.display = 'none'; 
    });
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', adminLogout);

    const setUserBtn = document.getElementById('setUserBtn');
    if (setUserBtn) setUserBtn.addEventListener('click', showUserPanel);
    const userSetBtn = document.getElementById('userSetBtn');
    if (userSetBtn) userSetBtn.addEventListener('click', userSetSubmit);
    const userClearBtn = document.getElementById('userClearBtn');
    if (userClearBtn) userClearBtn.addEventListener('click', () => { 
        currentUser = { id: null, name: null }; 
        updateCurrentUserIndicator(); 
        updateRequestsDisplay(); 
        document.getElementById('userPanel').style.display = 'none'; 
    });
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    if (userLogoutBtn) userLogoutBtn.addEventListener('click', userLogout);

    // Request form
    document.getElementById('submitRequestButton').addEventListener('click', submitNewRequest);
    document.getElementById('cancelRequestButton').addEventListener('click', () => {
        document.getElementById('requestFormContainer').style.display = 'none';
        clearRequestForm();
    });

    // Backup functionality
    const downloadBackupBtn = document.getElementById('downloadBackupBtn');
    if (downloadBackupBtn) downloadBackupBtn.addEventListener('click', downloadBackup);
    
    const restoreBackupBtn = document.getElementById('restoreBackupBtn');
    if (restoreBackupBtn) restoreBackupBtn.addEventListener('click', restoreFromBackup);
    
    const backupHistoryBtn = document.getElementById('backupHistoryBtn');
    if (backupHistoryBtn) backupHistoryBtn.addEventListener('click', showBackupHistory);
    
    const importBackupBtn = document.getElementById('importBackupBtn');
    if (importBackupBtn) importBackupBtn.addEventListener('click', () => {
        document.getElementById('backupFileInput').click();
    });
    
    const backupFileInput = document.getElementById('backupFileInput');
    if (backupFileInput) backupFileInput.addEventListener('change', importBackupFile);
    
    // Backup menu toggle
    const backupToggleBtn = document.getElementById('backupToggleBtn');
    const backupMenu = document.getElementById('backupMenu');
    if (backupToggleBtn && backupMenu) {
        backupToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            backupMenu.style.display = backupMenu.style.display === 'none' ? 'block' : 'none';
        });
        
        document.addEventListener('click', (e) => {
            if (!backupToggleBtn.contains(e.target) && !backupMenu.contains(e.target)) {
                backupMenu.style.display = 'none';
            }
        });
        
        backupMenu.addEventListener('click', () => {
            setTimeout(() => {
                backupMenu.style.display = 'none';
            }, 200);
        });
    }
}

function updateAdminUI() {
    const addBtn = document.getElementById('addButton');
    const shareItemBtn = document.getElementById('shareItemButton');
    const adminIndicator = document.getElementById('adminIndicator');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (addBtn) addBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    if (shareItemBtn) shareItemBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    if (adminIndicator) adminIndicator.style.display = isAdmin ? 'inline-block' : 'none';
    if (adminLoginBtn) adminLoginBtn.style.display = isAdmin ? 'none' : 'inline-flex';
    if (adminLogoutBtn) adminLogoutBtn.style.display = isAdmin ? 'inline-flex' : 'none';

    if (!isAdmin) {
        document.getElementById('addFormContainer').style.display = 'none';
        document.getElementById('shareFormContainer').style.display = 'none';
    }

    const setUserBtn = document.getElementById('setUserBtn');
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    const currentUserIndicator = document.getElementById('currentUserIndicator');
    
    if (isAdmin) {
        if (setUserBtn) setUserBtn.style.display = 'none';
        if (userLogoutBtn) userLogoutBtn.style.display = 'none';
        if (currentUserIndicator) currentUserIndicator.style.display = 'none';
    } else {
        if (setUserBtn) setUserBtn.style.display = currentUser.id ? 'none' : 'inline-flex';
        if (userLogoutBtn) userLogoutBtn.style.display = currentUser.id ? 'inline-flex' : 'none';
        if (currentUserIndicator) currentUserIndicator.style.display = 'inline-block';
    }

    updateInventoryDisplay();
    updateRequestsDisplay();
    updateAllocationsDisplay();
}

// ============ INVENTORY FUNCTIONS ============

function getFilteredInventory() {
    return inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        const matchesDept = filterDepartment === 'All' || (item.department || 'General') === filterDepartment;
        return matchesSearch && matchesCategory && matchesDept;
    });
}

function getItemAllocated(itemId) {
    return allocations
        .filter(alloc => alloc.itemId === itemId)
        .reduce((sum, alloc) => sum + alloc.quantity, 0);
}

function updateInventoryDisplay() {
    const filtered = getFilteredInventory();
    updateStats(filtered);
    updateInventoryTable(filtered);
}

function updateStats(filtered) {
    const totalQuantity = filtered.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = filtered.reduce((sum, item) => sum + (item.quantity * item.value), 0);
    const categories = new Set(inventory.map(item => item.category));
    const availableQuantity = filtered.reduce((sum, item) => {
        const allocated = getItemAllocated(item.id);
        return sum + Math.max(0, item.quantity - allocated);
    }, 0);
    
    document.getElementById('totalItems').textContent = totalQuantity.toLocaleString();
    document.getElementById('totalValue').textContent = '₹' + totalValue.toLocaleString();
    document.getElementById('totalCategories').textContent = categories.size;
    document.getElementById('availableItems').textContent = availableQuantity.toLocaleString();
}

function updateInventoryTable(filtered) {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = filtered.map((item) => {
        if (editingId === item.id) return createEditRow(item);
        return createDisplayRow(item);
    }).join('');
}

function createDisplayRow(item) {
    const allocated = getItemAllocated(item.id);
    const available = item.quantity - allocated;
    const totalValue = (item.quantity * item.value).toLocaleString();
    const rowAttrs = isAdmin ? `ondblclick="editItem(${item.id})" title="Double-click to edit" style="cursor:pointer"` : '';

    let actionsHtml = '';
    if (isAdmin) {
        actionsHtml = `
            <button class="icon-btn edit" onclick="event.stopPropagation(); editItem(${item.id})" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn delete" onclick="event.stopPropagation(); deleteItem(${item.id})" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        `;
    } else {
        actionsHtml = `<button class="icon-btn" title="Admin only" onclick="event.stopPropagation(); alert('Only admins can edit/delete items')"><i class="fas fa-lock"></i></button>`;
    }

    actionsHtml += `
        <button class="icon-btn" title="View history" onclick="event.stopPropagation(); showHistory(${item.id})">
            <i class="fas fa-info-circle"></i>
        </button>
    `;

    return `
        <tr ${rowAttrs}>
            <td><strong>${item.name}</strong></td>
            <td><span class="category-badge">${item.category}</span></td>
            <td><span class="department-badge">${item.department || 'General'}</span></td>
            <td style="color: ${available > 0 ? '#16a34a' : '#dc2626'}; font-weight: bold;">${available}</td>
            <td style="color: #ea580c;">${allocated}</td>
            <td>${item.quantity}</td>
            <td>₹${item.value.toLocaleString()}</td>
            <td><strong>₹${totalValue}</strong></td>
            <td>
                <div class="actions-container">
                    ${actionsHtml}
                </div>
            </td>
        </tr>
    `;
}

function createEditRow(item) {
    const allocated = getItemAllocated(item.id);
    const available = item.quantity - allocated;
    const totalValue = (item.quantity * item.value).toLocaleString();
    
    return `
        <tr>
            <td><input type="text" class="edit-input" id="edit-name-${item.id}" value="${item.name}"></td>
            <td><input type="text" class="edit-input" id="edit-category-${item.id}" value="${item.category}"></td>
            <td>
                <select class="edit-input" id="edit-department-${item.id}">
                    <option value="General" ${(item.department || 'General') === 'General' ? 'selected' : ''}>General</option>
                    <option value="Computer Science" ${(item.department || 'General') === 'Computer Science' ? 'selected' : ''}>Computer Science</option>
                    <option value="Electronics" ${(item.department || 'General') === 'Electronics' ? 'selected' : ''}>Electronics</option>
                    <option value="Chemistry" ${(item.department || 'General') === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
                    <option value="Biology" ${(item.department || 'General') === 'Biology' ? 'selected' : ''}>Biology</option>
                    <option value="Library" ${(item.department || 'General') === 'Library' ? 'selected' : ''}>Library</option>
                    <option value="Sports" ${(item.department || 'General') === 'Sports' ? 'selected' : ''}>Sports</option>
                    <option value="Management" ${(item.department || 'General') === 'Management' ? 'selected' : ''}>Management</option>
                </select>
            </td>
            <td>${available}</td>
            <td>${allocated}</td>
            <td><input type="number" class="edit-input" id="edit-quantity-${item.id}" value="${item.quantity}"></td>
            <td><input type="number" class="edit-input" id="edit-value-${item.id}" value="${item.value}"></td>
            <td>₹${totalValue}</td>
            <td>
                <div class="actions-container">
                    <button class="icon-btn save" onclick="saveEdit(${item.id})">
                        <i class="fas fa-save"></i>
                    </button>
                    <button class="icon-btn cancel" onclick="cancelEdit()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function editItem(id) {
    if (!isAdmin) { 
        alert('Only admins can edit inventory items.'); 
        return; 
    }
    editingId = id;
    updateInventoryDisplay();
}

function saveEdit(id) {
    if (!isAdmin) { 
        alert('Only admins can save inventory changes.'); 
        return; 
    }
    const item = inventory.find(i => i.id === id);
    if (item) {
        const today = new Date().toISOString();
        const oldQty = item.quantity;
        const newQty = parseInt(document.getElementById(`edit-quantity-${id}`).value);
        
        item.name = document.getElementById(`edit-name-${id}`).value;
        item.category = document.getElementById(`edit-category-${id}`).value;
        item.department = document.getElementById(`edit-department-${id}`).value;
        item.quantity = newQty;
        item.value = parseFloat(document.getElementById(`edit-value-${id}`).value);
        
        if (oldQty !== newQty) {
            const diff = newQty - oldQty;
            const action = diff > 0 ? 'added' : 'removed';
            if (!Array.isArray(item.history)) item.history = [];
            item.history.push({ 
                type: action, 
                qty: Math.abs(diff), 
                date: today, 
                by: 'Admin Edit', 
                note: `Quantity adjusted from ${oldQty} to ${newQty}` 
            });
        }
    }
    editingId = null;
    initializeCategories();
    updateInventoryDisplay();
}

function cancelEdit() {
    editingId = null;
    updateInventoryDisplay();
}

function deleteItem(id) {
    if (!isAdmin) { 
        alert('Only admins can delete inventory items.'); 
        return; 
    }
    
    const allocated = getItemAllocated(id);
    if (allocated > 0) {
        alert('Cannot delete item with active allocations. Please return all allocated items first.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this item?')) {
        inventory = inventory.filter(item => item.id !== id);
        initializeCategories();
        updateInventoryDisplay();
    }
}

function addNewItem() {
    if (!isAdmin) { 
        alert('Only admins can add inventory items.'); 
        return; 
    }
    
    const name = document.getElementById('newName').value.trim();
    const category = document.getElementById('newCategory').value.trim();
    const quantity = parseInt(document.getElementById('newQuantity').value) || 0;
    const value = parseFloat(document.getElementById('newValue').value) || 0;
    const department = document.getElementById('newDepartment').value || 'General';

    if (!name || !category) {
        alert('Please fill in Item Name and Category');
        return;
    }

    if (quantity <= 0) {
        alert('Please enter a valid quantity (greater than 0)');
        return;
    }

    if (value < 0) {
        alert('Please enter a valid value (0 or greater)');
        return;
    }

    const newId = Math.max(...inventory.map(i => i.id)) + 1;
    const today = new Date().toISOString();
    
    inventory.push({
        id: newId,
        name,
        category,
        quantity,
        value,
        department,
        history: [{ 
            type: 'added', 
            qty: quantity, 
            date: today, 
            by: 'Admin', 
            note: 'Item added to inventory' 
        }]
    });

    document.getElementById('addFormContainer').style.display = 'none';
    clearAddForm();
    initializeCategories();
    updateInventoryDisplay();
    
    alert(`${name} has been added to inventory!`);
}

function clearAddForm() {
    document.getElementById('newName').value = '';
    document.getElementById('newCategory').value = '';
    document.getElementById('newQuantity').value = '';
    document.getElementById('newValue').value = '';
}

function addCommonItem(type) {
    if (!isAdmin) { 
        alert('Only admins can add inventory items.'); 
        return; 
    }
    
    const templates = {
        'computer': { 
            name: 'Desktop Computer', 
            category: 'Electronics', 
            quantity: 1, 
            value: 45000,
            department: 'General'
        },
        'chair': { 
            name: 'Office Chair', 
            category: 'Furniture', 
            quantity: 1, 
            value: 3500,
            department: 'General'
        },
        'projector': { 
            name: 'Projector', 
            category: 'Electronics', 
            quantity: 1, 
            value: 25000,
            department: 'General'
        },
        'table': { 
            name: 'Conference Table', 
            category: 'Furniture', 
            quantity: 1, 
            value: 12000,
            department: 'General'
        },
        'books': { 
            name: 'Textbook Set', 
            category: 'Books', 
            quantity: 50, 
            value: 500,
            department: 'General'
        },
        'lab': { 
            name: 'Chemistry Lab Kit', 
            category: 'Lab Equipment', 
            quantity: 5, 
            value: 8500,
            department: 'General'
        }
    };
    
    if (templates[type]) {
        const template = templates[type];
        const newId = Math.max(...inventory.map(i => i.id)) + 1;
        const today = new Date().toISOString();
        
        inventory.push({
            id: newId,
            ...template,
            history: [{ 
                type: 'added', 
                qty: template.quantity, 
                date: today, 
                by: 'Admin (Quick Add)', 
                note: 'Item added via quick add' 
            }]
        });
        
        initializeCategories();
        updateInventoryDisplay();
        alert(`${template.name} has been added to inventory!`);
    }
}

function showHistory(id) {
    const item = inventory.find(i => i.id === id);
    const modal = document.getElementById('historyModal');
    const content = document.getElementById('historyContent');
    if (!item || !modal || !content) return;
    
    const allocated = getItemAllocated(item.id);
    const available = item.quantity - allocated;
    
    let html = `
        <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: #312e81;">${item.name}</h4>
            <p style="margin: 0; color: #6b7280;">
                Category: <strong>${item.category}</strong> | 
                Total Quantity: <strong>${item.quantity}</strong> | 
                Available: <strong style="color: #16a34a;">${available}</strong> | 
                Allocated: <strong style="color: #ea580c;">${allocated}</strong>
            </p>
        </div>
    `;
    
    if (item.history && item.history.length > 0) {
        html += '<h5 style="margin: 1rem 0 0.5rem 0;">Activity History</h5>';
        html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">';
        html += '<thead><tr style="background: #f3f4f6; border-bottom: 2px solid #d1d5db;">';
        html += '<th style="padding: 0.5rem; text-align: left;">Date</th>';
        html += '<th style="padding: 0.5rem; text-align: left;">Action</th>';
        html += '<th style="padding: 0.5rem; text-align: center;">Qty</th>';
        html += '<th style="padding: 0.5rem; text-align: left;">By</th>';
        html += '<th style="padding: 0.5rem; text-align: left;">Note</th>';
        html += '</tr></thead><tbody>';
        
        item.history.slice().reverse().forEach(h => {
            html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
            html += `<td style="padding: 0.5rem;">${new Date(h.date).toLocaleDateString()}</td>`;
            html += `<td style="padding: 0.5rem;">${h.type}</td>`;
            html += `<td style="padding: 0.5rem; text-align: center;">${h.qty}</td>`;
            html += `<td style="padding: 0.5rem;">${h.by}</td>`;
            html += `<td style="padding: 0.5rem;">${h.note || '-'}</td>`;
            html += '</tr>';
        });
        
        html += '</tbody></table>';
    } else {
        html += '<p style="color: #9ca3af; font-style: italic;">No activity history available.</p>';
    }
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeHistory() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.style.display = 'none';
}

// ============ ALLOCATION FUNCTIONS ============

function getFilteredAllocations() {
    return allocations.filter(alloc => {
        const item = inventory.find(i => i.id === alloc.itemId);
        const itemName = item ? item.name : '';
        
        const matchesSearch = itemName.toLowerCase().includes(allocationSearchTerm.toLowerCase()) ||
                            alloc.department.toLowerCase().includes(allocationSearchTerm.toLowerCase());
        const matchesDept = allocationDeptFilter === 'All' || alloc.department === allocationDeptFilter;
        
        return matchesSearch && matchesDept;
    });
}

function updateAllocationsDisplay() {
    const filtered = getFilteredAllocations();
    updateAllocationStats();
    updateAllocationsTable(filtered);
}

function updateAllocationStats() {
    const totalAllocs = allocations.length;
    const itemsAllocated = allocations.reduce((sum, alloc) => sum + alloc.quantity, 0);
    const depts = new Set(allocations.map(a => a.department));
    const defaultCount = allocations.filter(a => a.isDefault).length;
    
    document.getElementById('totalAllocations').textContent = totalAllocs;
    document.getElementById('itemsAllocated').textContent = itemsAllocated;
    document.getElementById('departmentsServed').textContent = depts.size;
    document.getElementById('defaultItemsCount').textContent = defaultCount;
}

function updateAllocationsTable(filtered) {
    const tbody = document.getElementById('allocationsTableBody');
    tbody.innerHTML = filtered.map(alloc => createAllocationRow(alloc)).join('');
}

function createAllocationRow(alloc) {
    const item = inventory.find(i => i.id === alloc.itemId);
    const itemName = item ? item.name : 'Unknown Item';
    const defaultBadge = alloc.isDefault ? '<span class="default-badge">DEFAULT</span>' : '';
    
    let actionsHtml = '';
    if (isAdmin) {
        actionsHtml = `
            <button class="icon-btn return" onclick="returnAllocation(${alloc.id})" title="Return to Inventory">
                <i class="fas fa-undo"></i>
            </button>
            <button class="icon-btn delete" onclick="deleteAllocation(${alloc.id})" title="Delete Allocation">
                <i class="fas fa-trash"></i>
            </button>
        `;
    } else {
        actionsHtml = '<span style="color: #9ca3af; font-size: 0.875rem;">View Only</span>';
    }
    
    return `
        <tr>
            <td><strong>#${alloc.id}</strong></td>
            <td>${itemName}</td>
            <td><span class="department-badge">${alloc.department}</span></td>
            <td><strong>${alloc.quantity}</strong></td>
            <td>${defaultBadge || '-'}</td>
            <td>${new Date(alloc.sharedDate).toLocaleDateString()}</td>
            <td>
                <div class="actions-container">
                    ${actionsHtml}
                </div>
            </td>
        </tr>
    `;
}

function populateShareItemSelect() {
    const select = document.getElementById('shareItemSelect');
    select.innerHTML = '<option value="">Select Item</option>';
    
    inventory.forEach(item => {
        const allocated = getItemAllocated(item.id);
        const available = item.quantity - allocated;
        if (available > 0) {
            select.innerHTML += `<option value="${item.id}">${item.name} (Available: ${available})</option>`;
        }
    });
}

function confirmShare() {
    if (!isAdmin) {
        alert('Only admins can share items.');
        return;
    }
    
    const itemId = parseInt(document.getElementById('shareItemSelect').value);
    const department = document.getElementById('shareDepartment').value;
    const quantity = parseInt(document.getElementById('shareQuantity').value);
    const isDefault = document.getElementById('isDefaultItem').checked;
    
    if (!itemId || !department || !quantity || quantity <= 0) {
        alert('Please fill all fields correctly');
        return;
    }
    
    const item = inventory.find(i => i.id === itemId);
    if (!item) {
        alert('Item not found');
        return;
    }
    
    const allocated = getItemAllocated(itemId);
    const available = item.quantity - allocated;
    
    if (quantity > available) {
        alert(`Not enough available quantity. Available: ${available}`);
        return;
    }
    
    const newAllocationId = allocations.length > 0 ? Math.max(...allocations.map(a => a.id)) + 1 : 1;
    const today = new Date().toISOString();
    
    allocations.push({
        id: newAllocationId,
        itemId: itemId,
        department: department,
        quantity: quantity,
        isDefault: isDefault,
        sharedDate: today
    });
    
    // Add to item history
    if (!Array.isArray(item.history)) item.history = [];
    item.history.push({
        type: 'shared',
        qty: quantity,
        date: today,
        by: department,
        note: `Shared with ${department}${isDefault ? ' (Default Item)' : ''}`
    });
    
    document.getElementById('shareFormContainer').style.display = 'none';
    clearShareForm();
    updateInventoryDisplay();
    updateAllocationsDisplay();
    
    alert(`${quantity} ${item.name}(s) shared with ${department}!`);
}

function clearShareForm() {
    document.getElementById('shareItemSelect').value = '';
    document.getElementById('shareDepartment').value = '';
    document.getElementById('shareQuantity').value = '';
    document.getElementById('isDefaultItem').checked = false;
}

function returnAllocation(allocationId) {
    if (!isAdmin) {
        alert('Only admins can return allocations.');
        return;
    }
    
    const allocation = allocations.find(a => a.id === allocationId);
    if (!allocation) return;
    
    const item = inventory.find(i => i.id === allocation.itemId);
    if (!item) return;
    
    if (confirm(`Return ${allocation.quantity} ${item.name}(s) from ${allocation.department} to inventory?`)) {
        const today = new Date().toISOString();
        
        // Add to item history
        if (!Array.isArray(item.history)) item.history = [];
        item.history.push({
            type: 'returned',
            qty: allocation.quantity,
            date: today,
            by: allocation.department,
            note: `Returned from ${allocation.department} to inventory`
        });
        
        // Remove allocation
        allocations = allocations.filter(a => a.id !== allocationId);
        
        updateInventoryDisplay();
        updateAllocationsDisplay();
        
        alert('Items returned to inventory successfully!');
    }
}

function deleteAllocation(allocationId) {
    if (!isAdmin) {
        alert('Only admins can delete allocations.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this allocation record?')) {
        allocations = allocations.filter(a => a.id !== allocationId);
        updateInventoryDisplay();
        updateAllocationsDisplay();
    }
}

function showDefaultItemsReport() {
    const modal = document.getElementById('defaultItemsModal');
    const content = document.getElementById('defaultItemsContent');
    if (!modal || !content) return;
    
    const defaultAllocations = allocations.filter(a => a.isDefault);
    
    if (defaultAllocations.length === 0) {
        content.innerHTML = '<p style="color: #9ca3af; font-style: italic;">No default items allocated yet.</p>';
        modal.style.display = 'flex';
        return;
    }
    
    // Group by department
    const byDept = {};
    defaultAllocations.forEach(alloc => {
        if (!byDept[alloc.department]) {
            byDept[alloc.department] = [];
        }
        byDept[alloc.department].push(alloc);
    });
    
    let html = '<h4 style="margin-bottom: 1rem; color: #312e81;">Default Items by Department</h4>';
    
    Object.keys(byDept).sort().forEach(dept => {
        const deptAllocs = byDept[dept];
        const totalItems = deptAllocs.reduce((sum, a) => sum + a.quantity, 0);
        
        html += `
            <div style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
                <h5 style="margin: 0 0 0.75rem 0; color: #4f46e5;">📦 ${dept} (${totalItems} items)</h5>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: #f3f4f6; border-bottom: 2px solid #d1d5db;">
                            <th style="padding: 0.5rem; text-align: left;">Item Name</th>
                            <th style="padding: 0.5rem; text-align: center;">Quantity</th>
                            <th style="padding: 0.5rem; text-align: left;">Shared Date</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        deptAllocs.forEach(alloc => {
            const item = inventory.find(i => i.id === alloc.itemId);
            const itemName = item ? item.name : 'Unknown';
            html += `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 0.5rem;">${itemName}</td>
                    <td style="padding: 0.5rem; text-align: center;"><strong>${alloc.quantity}</strong></td>
                    <td style="padding: 0.5rem;">${new Date(alloc.sharedDate).toLocaleDateString()}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
    });
    
    html += `
        <div style="margin-top: 1rem; padding: 1rem; background: #eef2ff; border-radius: 8px;">
            <strong>Summary:</strong> ${defaultAllocations.length} default item allocation(s) across ${Object.keys(byDept).length} department(s).
        </div>
    `;
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeDefaultItemsModal() {
    const modal = document.getElementById('defaultItemsModal');
    if (modal) modal.style.display = 'none';
}

// ============ AUTH PANEL FUNCTIONS ============

function showAdminPanel() {
    const panel = document.getElementById('adminPanel');
    const userPanel = document.getElementById('userPanel');
    
    if (!panel) return;
    
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (userPanel) userPanel.style.display = 'none';
    
    const pwInput = document.getElementById('adminPasswordInput');
    if (pwInput) {
        pwInput.value = '';
        pwInput.focus();
    }
}

function adminLoginSubmit() {
    const pwInput = document.getElementById('adminPasswordInput');
    if (!pwInput) return;
    
    const pw = pwInput.value.trim();
    if (pw === ADMIN_PASSWORD) {
        isAdmin = true;
        saveSessionData();
        document.getElementById('adminPanel').style.display = 'none';
        updateAdminUI();
        alert('Admin mode enabled! You can now add, edit, and share items.');
    } else {
        alert('Incorrect password. Try again.');
        pwInput.focus();
        pwInput.select();
    }
}

function showUserPanel() {
    const panel = document.getElementById('userPanel');
    const adminPanel = document.getElementById('adminPanel');
    
    if (!panel) return;
    
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (adminPanel) adminPanel.style.display = 'none';
    
    const nameInput = document.getElementById('userNameInput');
    const idInput = document.getElementById('userIdInput');
    
    if (currentUser && currentUser.id) {
        if (nameInput) nameInput.value = currentUser.name || '';
        if (idInput) idInput.value = currentUser.id || '';
    } else {
        if (nameInput) nameInput.value = '';
        if (idInput) idInput.value = '';
    }
    
    if (nameInput) nameInput.focus();
}

function userSetSubmit() {
    const nameInput = document.getElementById('userNameInput');
    const idInput = document.getElementById('userIdInput');
    
    if (!nameInput || !idInput) return;
    
    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    
    if (!name || !id) { 
        alert('Please enter both name and ID'); 
        return; 
    }
    
    currentUser = { id, name };
    saveSessionData();
    document.getElementById('userPanel').style.display = 'none';
    updateCurrentUserIndicator();
    updateRequestsDisplay();
    updateAdminUI();
    
    alert(`User set to: ${name} (${id})`);
}

function adminLogout() {
    if (confirm('Are you sure you want to logout from admin mode?')) {
        isAdmin = false;
        saveSessionData();
        updateAdminUI();
        alert('Admin mode disabled.');
    }
}

function userLogout() {
    if (confirm('Are you sure you want to logout as user?')) {
        currentUser = { id: null, name: null };
        saveSessionData();
        updateCurrentUserIndicator();
        updateRequestsDisplay();
        updateAdminUI();
        alert('Logged out as user.');
    }
}

function updateCurrentUserIndicator() {
    const el = document.getElementById('currentUserIndicator');
    if (!el) return;
    
    if (currentUser && currentUser.id) {
        el.textContent = `${currentUser.name} (${currentUser.id})`;
        el.style.color = '#1e40af';
    } else {
        el.textContent = 'Guest';
        el.style.color = '#374151';
    }
}

// ============ REQUEST MANAGEMENT FUNCTIONS ============

function getFilteredRequests() {
    const base = requests.filter(req => {
        const matchesSearch = (req.studentName || '').toLowerCase().includes(requestSearchTerm.toLowerCase()) ||
                            (req.studentId || '').toLowerCase().includes(requestSearchTerm.toLowerCase()) ||
                            (req.itemName || '').toLowerCase().includes(requestSearchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (isAdmin) return base;
    if (currentUser && currentUser.id) {
        return base.filter(req => req.studentId === currentUser.id);
    }
    return [];
}

function updateRequestsDisplay() {
    const filtered = getFilteredRequests();
    updateRequestStats();
    updateRequestsTable(filtered);
}

function updateRequestStats() {
    const pending = requests.filter(r => r.status === 'Pending').length;
    const approved = requests.filter(r => r.status === 'Approved').length;
    const fulfilled = requests.filter(r => r.status === 'Fulfilled').length;
    const rejected = requests.filter(r => r.status === 'Rejected').length;

    document.getElementById('pendingRequests').textContent = pending;
    document.getElementById('approvedRequests').textContent = approved;
    document.getElementById('fulfilledRequests').textContent = fulfilled;
    document.getElementById('rejectedRequests').textContent = rejected;
}

function updateRequestsTable(filtered) {
    const tbody = document.getElementById('requestsTableBody');
    tbody.innerHTML = filtered.map(req => createRequestRow(req)).join('');
}

function createRequestRow(req) {
    const statusClass = `status-${req.status.toLowerCase()}`;
    const isOwner = currentUser && currentUser.id && req.studentId === currentUser.id;

    if (isAdmin) {
        return `
        <tr>
            <td><strong>#${req.id}</strong></td>
            <td>${req.studentName}</td>
            <td>${req.studentId}</td>
            <td>${req.department}</td>
            <td>${req.itemName}</td>
            <td>${req.quantity}</td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${req.purpose}">${req.purpose}</td>
            <td>${new Date(req.requiredDate).toLocaleDateString()}</td>
            <td><span class="status-badge ${statusClass}">${req.status}</span></td>
            <td>
                <div class="actions-container">
                    ${req.status === 'Pending' ? `
                        <button class="icon-btn approve" onclick="updateRequestStatus(${req.id}, 'Approved')" title="Approve">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="icon-btn reject" onclick="updateRequestStatus(${req.id}, 'Rejected')" title="Reject">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    ${req.status === 'Approved' ? `
                        <button class="icon-btn fulfill" onclick="updateRequestStatus(${req.id}, 'Fulfilled')" title="Mark as Fulfilled">
                            <i class="fas fa-check-double"></i>
                        </button>
                    ` : ''}
                    <button class="icon-btn delete" onclick="deleteRequest(${req.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
    }

    if (isOwner) {
        return `
        <tr>
            <td><strong>#${req.id}</strong></td>
            <td>${req.studentName}</td>
            <td>${req.studentId}</td>
            <td>${req.department}</td>
            <td>${req.itemName}</td>
            <td>${req.quantity}</td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${req.purpose}">${req.purpose}</td>
            <td>${new Date(req.requiredDate).toLocaleDateString()}</td>
            <td><span class="status-badge ${statusClass}">${req.status}</span></td>
            <td>
                <div class="actions-container">
                    <button class="icon-btn" title="No actions available" onclick="event.stopPropagation(); alert('Only admins can modify requests')">
                        <i class="fas fa-lock"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
    }

    return `
        <tr>
            <td><strong>#${req.id}</strong></td>
            <td>Hidden</td>
            <td>Hidden</td>
            <td>Hidden</td>
            <td>${req.itemName}</td>
            <td>${req.quantity}</td>
            <td>Hidden</td>
            <td>Hidden</td>
            <td><span class="status-badge ${statusClass}">${req.status}</span></td>
            <td>
                <div class="actions-container">
                    <button class="icon-btn" title="Request submitted">
                        <i class="fas fa-eye-slash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function submitNewRequest() {
    const studentName = document.getElementById('reqStudentName').value.trim();
    const studentId = document.getElementById('reqStudentId').value.trim();
    const department = document.getElementById('reqDepartment').value.trim();
    const itemName = document.getElementById('reqItemName').value.trim();
    const quantity = parseInt(document.getElementById('reqQuantity').value) || 1;
    const purpose = document.getElementById('reqPurpose').value.trim();
    const requiredDate = document.getElementById('reqDate').value;

    if (!studentName || !studentId || !department || !itemName || !purpose || !requiredDate) {
        alert('Please fill in all required fields');
        return;
    }

    const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    requests.push({
        id: newId,
        studentName,
        studentId,
        department,
        itemName,
        quantity,
        purpose,
        requiredDate,
        status: 'Pending',
        requestDate: today
    });

    document.getElementById('requestFormContainer').style.display = 'none';
    clearRequestForm();
    updateRequestsDisplay();
    alert('Request submitted successfully!');
}

function clearRequestForm() {
    document.getElementById('reqStudentName').value = '';
    document.getElementById('reqStudentId').value = '';
    document.getElementById('reqDepartment').value = '';
    document.getElementById('reqItemName').value = '';
    document.getElementById('reqQuantity').value = '1';
    document.getElementById('reqPurpose').value = '';
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('reqDate').value = tomorrow.toISOString().split('T')[0];
}

function updateRequestStatus(id, newStatus) {
    if (!isAdmin) {
        alert('Only admins can perform this action.');
        return;
    }

    const request = requests.find(r => r.id === id);
    if (request) {
        const confirmMsg = newStatus === 'Rejected'
            ? 'Are you sure you want to reject this request?'
            : `Are you sure you want to mark this request as ${newStatus}?`;

        if (!confirm(confirmMsg)) return;

        if (newStatus === 'Fulfilled') {
            const item = inventory.find(it => it.name.toLowerCase() === request.itemName.toLowerCase());
            const today = new Date().toISOString();
            if (!item) {
                alert('Inventory item not found for this request.');
                return;
            }
            
            const allocated = getItemAllocated(item.id);
            const available = item.quantity - allocated;
            
            if (available < request.quantity) {
                alert(`Insufficient available quantity. Available: ${available}`);
                return;
            }
            
            // Create allocation instead of reducing inventory
            const newAllocationId = allocations.length > 0 ? Math.max(...allocations.map(a => a.id)) + 1 : 1;
            allocations.push({
                id: newAllocationId,
                itemId: item.id,
                department: request.department,
                quantity: request.quantity,
                isDefault: false,
                sharedDate: today
            });
            
            if (!Array.isArray(item.history)) item.history = [];
            item.history.push({ 
                type: 'allocated', 
                qty: request.quantity, 
                date: today, 
                by: request.studentName || request.department, 
                note: `Fulfilled request #${request.id} for ${request.department}` 
            });
            
            initializeCategories();
            updateInventoryDisplay();
            updateAllocationsDisplay();
        }

        request.status = newStatus;
        updateRequestsDisplay();
    }
}

function deleteRequest(id) {
    if (!isAdmin) {
        alert('Only admins can delete requests.');
        return;
    }

    if (confirm('Are you sure you want to delete this request?')) {
        requests = requests.filter(r => r.id !== id);
        updateRequestsDisplay();
    }
}

// ============ EXPORT FUNCTIONS ============

function exportToExcel() {
    const filtered = getFilteredInventory();
    
    if (filtered.length === 0) {
        alert('No items to export');
        return;
    }

    const headers = ['ID', 'Name', 'Category', 'Department', 'Available', 'Allocated', 'Total', 'Unit Value (₹)', 'Total Value (₹)'];
    const rows = filtered.map(item => {
        const allocated = getItemAllocated(item.id);
        const available = item.quantity - allocated;
        return [
            item.id,
            item.name,
            item.category,
            item.department || 'General',
            available,
            allocated,
            item.quantity,
            item.value,
            item.quantity * item.value
        ];
    });

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Inventory exported successfully!');
}

function exportToPdf() {
    const filtered = getFilteredInventory();
    
    if (filtered.length === 0) {
        alert('No items to export');
        return;
    }

    const timestamp = new Date().toLocaleString();
    let html = `
        <h2 style="text-align:center; color:#312e81;">College Inventory Report</h2>
        <p style="text-align:center; color:#666;">Generated on ${timestamp}</p>
        <table border="1" cellpadding="8" style="width:100%; border-collapse:collapse; font-size:10px;">
            <thead>
                <tr style="background-color:#312e81; color:white;">
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Department</th>
                    <th>Available</th>
                    <th>Allocated</th>
                    <th>Total</th>
                    <th>Unit Value (₹)</th>
                    <th>Total Value (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalValue = 0;
    filtered.forEach(item => {
        const allocated = getItemAllocated(item.id);
        const available = item.quantity - allocated;
        const itemTotal = item.quantity * item.value;
        totalValue += itemTotal;
        html += `
            <tr>
                <td style="text-align:center;">${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.department || 'General'}</td>
                <td style="text-align:center;">${available}</td>
                <td style="text-align:center;">${allocated}</td>
                <td style="text-align:center;">${item.quantity}</td>
                <td style="text-align:right;">₹${item.value.toFixed(2)}</td>
                <td style="text-align:right;">₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <p style="margin-top:20px; font-weight:bold; text-align:right;">
            Grand Total: ₹${totalValue.toFixed(2)}
        </p>
        <p style="margin-top:20px; color:#666; font-size:10px;">
            Total Items: ${filtered.length} | Total Quantity: ${filtered.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
    `;

    const opt = {
        margin: 10,
        filename: `inventory_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(html).save();
}

function showDeptReport() {
    const departments = getDepartments();
    const modal = document.getElementById('deptReportModal');
    const content = document.getElementById('deptReportContent');
    
    if (!modal || !content) return;

    let html = '<div style="overflow-x:auto;">';
    let grandTotal = 0;
    let grandQuantity = 0;

    departments.forEach(dept => {
        const deptItems = inventory.filter(item => (item.department || 'General') === dept);
        const deptValue = deptItems.reduce((sum, item) => sum + (item.quantity * item.value), 0);
        const deptQuantity = deptItems.reduce((sum, item) => sum + item.quantity, 0);
        
        grandTotal += deptValue;
        grandQuantity += deptQuantity;

        html += `
            <div style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
                <h3 style="margin: 0 0 1rem 0; color: #312e81; border-bottom: 2px solid #4f46e5; padding-bottom: 0.5rem;">
                    📦 ${dept}
                </h3>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    <div style="background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Total Items</p>
                        <p style="margin: 0; font-size: 1.25rem; font-weight: bold; color: #312e81;">${deptItems.length}</p>
                    </div>
                    <div style="background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Total Quantity</p>
                        <p style="margin: 0; font-size: 1.25rem; font-weight: bold; color: #059669;">${deptQuantity}</p>
                    </div>
                    <div style="background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Total Value</p>
                        <p style="margin: 0; font-size: 1.25rem; font-weight: bold; color: #d97706;">₹${deptValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div style="background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Avg Value/Item</p>
                        <p style="margin: 0; font-size: 1.25rem; font-weight: bold; color: #7c3aed;">₹${deptItems.length > 0 ? (deptValue / deptItems.length).toFixed(0).toLocaleString('en-IN') : '0'}</p>
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: #f3f4f6; border-bottom: 2px solid #d1d5db;">
                            <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Item</th>
                            <th style="padding: 0.75rem; text-align: center; font-weight: 600;">Available</th>
                            <th style="padding: 0.75rem; text-align: center; font-weight: 600;">Allocated</th>
                            <th style="padding: 0.75rem; text-align: center; font-weight: 600;">Total</th>
                            <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Value</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        deptItems.forEach(item => {
            const allocated = getItemAllocated(item.id);
            const available = item.quantity - allocated;
            html += `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 0.75rem;">${item.name}</td>
                    <td style="padding: 0.75rem; text-align: center; color: #16a34a;">${available}</td>
                    <td style="padding: 0.75rem; text-align: center; color: #ea580c;">${allocated}</td>
                    <td style="padding: 0.75rem; text-align: center;">${item.quantity}</td>
                    <td style="padding: 0.75rem; text-align: right;">₹${(item.quantity * item.value).toLocaleString('en-IN')}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 2rem; padding: 1.5rem; background: #312e81; color: white; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 1rem 0;">Grand Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
                <div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Total Items</p>
                    <p style="margin: 0; font-size: 2rem; font-weight: bold;">${inventory.length}</p>
                </div>
                <div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Total Quantity</p>
                    <p style="margin: 0; font-size: 2rem; font-weight: bold;">${grandQuantity}</p>
                </div>
                <div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Total Value</p>
                    <p style="margin: 0; font-size: 2rem; font-weight: bold;">₹${grandTotal.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeDeptReport() {
    const modal = document.getElementById('deptReportModal');
    if (modal) modal.style.display = 'none';
}
