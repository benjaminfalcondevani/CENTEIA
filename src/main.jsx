import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bell, Bot, BriefcaseBusiness, Building2, CalendarDays, CheckSquare, ChevronLeft, ChevronRight, Download, FileText, LayoutDashboard, Mail, Moon, Phone, Plus, Printer, Search, Send, Sun, Users, WalletCards } from 'lucide-react';
import './styles.css';

const money = (value) => `$ ${value.toLocaleString('es-AR')}`;
const shortMoney = (value) => `$ ${(value / 1000).toFixed(0)}.000`;

const properties = [
  { id: 'p1', title: 'Depto Palermo', address: 'Av. Santa Fe 3250, Palermo, CABA', status: 'Alquilada', type: 'Departamento', beds: 3, baths: 2, area: 85, rent: 450000, owner: 'Carlos Mendoza', tenant: 'María González', image: 'linear-gradient(135deg,#21302a,#0f1513)' },
  { id: 'p2', title: 'Casa Belgrano', address: 'Mendoza 1540, Belgrano, CABA', status: 'Alquilada', type: 'Casa', beds: 4, baths: 3, area: 180, rent: 680000, owner: 'Jorge Fernández', tenant: 'Roberto Silva', image: 'linear-gradient(135deg,#182634,#101316)' },
  { id: 'p3', title: 'Local Caballito', address: 'Av. Rivadavia 5800, Caballito, CABA', status: 'Libre', type: 'Local', beds: 1, baths: 1, area: 60, rent: 350000, owner: 'Ana López', tenant: null, image: 'linear-gradient(135deg,#332317,#111)' },
  { id: 'p4', title: 'Depto Recoleta', address: 'Callao 1200, Recoleta, CABA', status: 'Alquilada', type: 'Departamento', beds: 2, baths: 1, area: 72, rent: 420000, owner: 'Jorge Fernández', tenant: 'Jorge Fernández', image: 'linear-gradient(135deg,#17332b,#101010)' },
  { id: 'p5', title: 'PH Villa Urquiza', address: 'Olazábal 4900, Villa Urquiza, CABA', status: 'Mantenimiento', type: 'PH', beds: 3, baths: 2, area: 95, rent: 390000, owner: 'Carlos Mendoza', tenant: null, image: 'linear-gradient(135deg,#2e2638,#121212)' },
  { id: 'p6', title: 'Oficina Microcentro', address: 'San Martín 450, Microcentro, CABA', status: 'Libre', type: 'Oficina', beds: 2, baths: 1, area: 110, rent: 520000, owner: 'Laura Pérez', tenant: null, image: 'linear-gradient(135deg,#243041,#101010)' },
];

const people = [
  { name: 'Carlos Mendoza', roles: ['Propietario'], phone: '11-5555-1111', email: 'carlos@email.com', dni: '22345678' },
  { name: 'María González', roles: ['Inquilino'], phone: '11-6666-2222', email: 'maria@email.com', dni: '30567890' },
  { name: 'Jorge Fernández', roles: ['Propietario', 'Inquilino'], phone: '11-7777-3333', email: 'jorge@email.com', dni: '25445566' },
  { name: 'Ana López', roles: ['Garante'], phone: '11-8888-4444', email: 'ana@email.com', dni: '28112233' },
  { name: 'Roberto Silva', roles: ['Inquilino'], phone: '11-9999-5555', email: 'roberto@email.com', dni: '33998877' },
  { name: 'Laura Pérez', roles: ['Proveedor', 'Técnico'], phone: '11-1234-6789', email: 'laura@email.com', dni: '30112233' },
  { name: 'Martín Ruiz', roles: ['Técnico'], phone: '11-2222-7777', email: 'martin@email.com', dni: '31888777' },
  { name: 'Sofía Torres', roles: ['Inquilino'], phone: '11-4444-9999', email: 'sofia@email.com', dni: '35666123' },
];

const contracts = [
  { property: 'Depto Palermo', person: 'María González', from: '28 de feb de 2025', to: '31 de ago de 2026', adjust: 'ICL', status: 'Activo', rent: 450000, due: 47 },
  { property: 'Casa Belgrano', person: 'Roberto Silva', from: '31 de ago de 2024', to: '30 de ago de 2026', adjust: 'ICL', status: 'Activo', rent: 680000, due: 46 },
  { property: 'Depto Recoleta', person: 'Jorge Fernández', from: '14 de ene de 2025', to: '30 de jul de 2026', adjust: 'IPC', status: 'Activo', rent: 420000, due: 15 },
  { property: 'Local Caballito', person: '—', from: '31 de may de 2025', to: '30 de may de 2027', adjust: 'ICL', status: 'Borrador', rent: 350000, due: null },
  { property: 'PH Villa Urquiza', person: 'Sofía Torres', from: '01 de ene de 2023', to: '31 de dic de 2025', adjust: 'IPC', status: 'Finalizado', rent: 390000, due: null },
];

const payments = [
  { title: 'Cobro · Mercado Pago', date: '14 de jul de 2026', status: 'Pagado', amount: 420000, kind: 'in' },
  { title: 'Cobro · Banco', date: '11 de jul de 2026', status: 'Pendiente', amount: 680000, kind: 'in' },
  { title: 'Cobro · Transferencia', date: '09 de jul de 2026', status: 'Pendiente', amount: 450000, kind: 'in' },
  { title: 'Expensas · Recoleta', date: '07 de jul de 2026', status: 'Vencido', amount: -78000, kind: 'out' },
  { title: 'Arreglo plomería', date: '04 de jul de 2026', status: 'Pagado', amount: -95000, kind: 'out' },
];

const tasks = [
  { title: 'Renovar contrato Palermo', note: 'Contactar al inquilino para renovar antes del vencimiento', date: '22 de jul de 2026', status: 'Por hacer', priority: 'medium' },
  { title: 'Inspección Casa Belgrano', note: '', date: '29 de jul de 2026', status: 'Por hacer', priority: 'low' },
  { title: 'Llamar plomero Villa Urquiza', note: '', date: '05 de ago de 2026', status: 'Por hacer', priority: 'high' },
  { title: 'Pagar expensas Recoleta', note: '', date: '17 de jul de 2026', status: 'En progreso', priority: 'high' },
  { title: 'Enviar recordatorio cobros', note: '', date: '16 de jul de 2026', status: 'En progreso', priority: 'low' },
  { title: 'Cobrar alquiler Caballito', note: '', date: '12 de jul de 2026', status: 'Hecho', priority: 'medium' },
];

const nav = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['properties', 'Propiedades', Building2], ['people', 'Personas', Users], ['contracts', 'Contratos', FileText], ['payments', 'Pagos', WalletCards], ['finance', 'Finanzas', BriefcaseBusiness], ['calendar', 'Agenda', CalendarDays], ['tasks', 'Tareas', CheckSquare], ['ai', 'BF AI', Bot],
];

function Shell() {
  const [page, setPage] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [query, setQuery] = useState('');
  const content = { dashboard: <Dashboard />, properties: <Properties query={query} />, people: <People query={query} />, contracts: <Contracts />, payments: <Payments />, finance: <Finance />, calendar: <Calendar />, tasks: <Tasks />, ai: <Assistant /> }[page];
  return <div className={`app ${theme}`}>
    <aside className="sidebar"><div className="brand"><div className="logo">BF</div><div><b>BF System</b><span>Inmobiliario</span></div></div><nav>{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setPage(id)} className={page === id ? 'active' : ''}><Icon size={18}/>{label}</button>)}</nav><small>© 2026 BF System</small></aside>
    <main><header><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar propiedades, personas, contratos..." /></div><button className="icon" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun/>:<Moon/>}</button><button className="icon"><Bell/></button><div className="avatar">BF</div></header>{content}</main>
  </div>;
}

function Stat({label, value, hint, icon:Icon}) { return <div className="stat"><div><span>{label}</span><strong>{value}</strong>{hint && <em>{hint}</em>}</div><i>{Icon && <Icon size={20}/>}</i></div>; }
function Title({title, sub, action}) { return <div className="title"><div><h1>{title}</h1><p>{sub}</p></div>{action}</div>; }
function Action({children}) { return <button className="primary"><Plus size={18}/>{children}</button>; }
function Badge({children}) { return <span className={`badge ${children}`}>{children}</span>; }

function Dashboard(){ const monthly=[1550,1550,1560,1560,1560,420].map((v,i)=>({m:['Feb','Mar','Abr','May','Jun','Jul'][i],v})); return <section><Title title="Dashboard" sub="Resumen general de tu inmobiliaria"/><div className="stats"><Stat label="Ingresos del mes" value={money(420000)} hint="↗ +12%" icon={WalletCards}/><Stat label="Ingresos anuales" value={money(8170000)} hint="↗ +8%" icon={BriefcaseBusiness}/><Stat label="Propiedades" value="6" hint="3 alq · 2 libres" icon={Building2}/><Stat label="Cobros pendientes" value="2" hint="$ 1.130.000" icon={WalletCards}/></div><div className="grid two"><Card title="Ingresos mensuales" sub="Últimos 6 meses"><ResponsiveContainer height={260}><AreaChart data={monthly}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2f6df6" stopOpacity={.55}/><stop offset="95%" stopColor="#2f6df6" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m"/><YAxis/><Tooltip/><Area type="monotone" dataKey="v" stroke="#2f6df6" fill="url(#g)"/></AreaChart></ResponsiveContainer></Card><Card title="Distribución" sub="Estado de propiedades"><ResponsiveContainer height={260}><PieChart><Pie data={[{name:'Alquilada',value:3},{name:'Libre',value:2},{name:'Mantenimiento',value:1}]} dataKey="value" innerRadius={60} outerRadius={95}>{['#2f6df6','#36c296','#f59e2f'].map(c=><Cell fill={c} key={c}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></Card></div></section> }
function Card({title,sub,children}){return <div className="card"><h3>{title}</h3>{sub&&<p>{sub}</p>}{children}</div>}
function Properties({query}){ const [filter,setFilter]=useState('Todas'); const list=properties.filter(p=>(filter==='Todas'||p.status===filter)&&`${p.title} ${p.address}`.toLowerCase().includes(query.toLowerCase())); return <section><Title title="Propiedades" sub={`${properties.length} propiedades registradas`} action={<Action>Nueva propiedad</Action>}/><Filters items={['Todas','Alquilada','Libre','Mantenimiento']} value={filter} setValue={setFilter}/><div className="cards">{list.map(p=><article className="property" key={p.id}><div className="photo" style={{background:p.image}}><Badge>{p.status}</Badge><Building2 size={46}/></div><h3>{p.title}</h3><p>{p.address}</p><div className="meta">🛏 {p.beds} 🛁 {p.baths} □ {p.area}m²</div><hr/><div><span>Alquiler</span><b>{money(p.rent)}</b></div></article>)}</div></section> }
function Filters({items,value,setValue}){return <div className="filters">{items.map(i=><button className={value===i?'active':''} onClick={()=>setValue(i)} key={i}>{i}</button>)}</div>}
function People({query}){ const list=people.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())||p.dni.includes(query)); return <section><Title title="Personas" sub={`${people.length} personas registradas`} action={<Action>Nueva persona</Action>}/><div className="cards people">{list.map(p=><article className="person" key={p.name}><div className="row"><div className="avatar">{p.name.split(' ').map(x=>x[0]).join('')}</div><div><h3>{p.name}</h3>{p.roles.map(r=><Badge key={r}>{r}</Badge>)}</div></div><p><Phone size={14}/>{p.phone}</p><p><Mail size={14}/>{p.email}</p><p>DNI: {p.dni}</p></article>)}</div></section> }
function Contracts(){ const [filter,setFilter]=useState('Todos'); const list=contracts.filter(c=>filter==='Todos'||c.status===filter); return <section><Title title="Contratos" sub="5 contratos · 3 activos" action={<Action>Nuevo contrato</Action>}/><Filters items={['Todos','Activo','Borrador','Finalizado']} value={filter} setValue={setFilter}/><div className="list">{list.map(c=><div className="listRow" key={c.property}><div><h3>{c.property} <Badge>{c.status}</Badge></h3><p>{c.person} &nbsp; {c.from} → {c.to} &nbsp; {c.adjust}</p></div><strong>{money(c.rent)}</strong>{c.due&&<em>Vence en {c.due}d</em>}</div>)}</div></section> }
function Payments(){ const [filter,setFilter]=useState('Todos'); const list=payments.filter(p=>filter==='Todos'||p.status===filter); return <section><Title title="Pagos" sub="20 movimientos registrados" action={<Action>Nuevo pago</Action>}/><div className="stats"><Stat label="Cobrado" value={money(8170000)}/><Stat label="Pendiente" value={money(1130000)}/><Stat label="Vencido" value={money(78000)}/></div><Filters items={['Todos','Pagado','Pendiente','Vencido']} value={filter} setValue={setFilter}/><div className="list">{list.map(p=><div className="pay" key={p.title}><div><h3>{p.title}</h3><p>{p.date}</p></div><Badge>{p.status}</Badge><strong className={p.amount>0?'green':'red'}>{p.amount>0?'+':''}{money(p.amount)}</strong></div>)}</div></section> }
function Finance(){ const bars=properties.slice(0,4).map(p=>({name:p.title.replace('Depto ',''),ing:p.rent,egr: p.title.includes('Recoleta')?78000:95000})); return <section><Title title="Finanzas y Reportes" sub="Análisis de rentabilidad por propiedad" action={<div className="actions"><button><Download size={16}/>CSV</button><button><Printer size={16}/>Imprimir</button></div>}/><div className="stats"><Stat label="Ingresos totales" value={money(420000)}/><Stat label="Egresos totales" value={money(203000)}/><Stat label="Ganancia neta" value={money(217000)}/><Stat label="Margen promedio" value="51.7%"/></div><Card title="Ingresos vs Egresos" sub="Comparativa por propiedad"><ResponsiveContainer height={310}><BarChart data={bars}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="ing" fill="#36c296"/><Bar dataKey="egr" fill="#ef4444"/></BarChart></ResponsiveContainer></Card></section> }
function Calendar(){ const events={4:['out',95000],7:['out',78000],9:['in',450000],11:['in',680000],12:['task','Cobrar alquiler Ca...'],14:['in',420000],16:['task','Enviar recordatori...'],17:['task','Pagar expensas R...'],22:['task','Renovar contrato']}; return <section><Title title="Agenda" sub="Vencimientos, cobros y eventos" action={<div className="month"><ChevronLeft/>Julio 2026<ChevronRight/></div>}/><div className="calendar"><b>Dom</b><b>Lun</b><b>Mar</b><b>Mié</b><b>Jue</b><b>Vie</b><b>Sáb</b>{Array.from({length:35},(_,i)=>{const d=i+1; const e=events[d]; return <div className="day" key={d}><span>{d}</span>{e&&<small className={e[0]}>{typeof e[1]==='number'?shortMoney(e[1]):e[1]}</small>}</div>})}</div></section> }
function Tasks(){ const cols=['Por hacer','En progreso','Hecho']; return <section><Title title="Tareas" sub="6 tareas · 5 pendientes"/><div className="kanban">{cols.map(col=><div className="column" key={col}><h3>{col}<span>{tasks.filter(t=>t.status===col).length}</span></h3>{tasks.filter(t=>t.status===col).map(t=><div className="task" key={t.title}><h4><i className={t.priority}></i>{t.title}</h4>{t.note&&<p>{t.note}</p>}<small><CalendarDays size={14}/>{t.date}</small></div>)}<button className="ghost">+ Agregar tarea</button></div>)}</div></section> }
function Assistant(){ const prompts=['¿Cuántas propiedades están alquiladas?','Calcular actualización ICL de un contrato','Resumen de cobros pendientes','¿Qué contratos vencen este mes?']; return <section className="ai"><div className="aiHead"><div className="spark"><Bot/></div><div><h1>BF AI</h1><p>Asistente inteligente inmobiliario</p></div></div><div className="bubble"><b>¡Hola! Soy BF AI, tu asistente inmobiliario inteligente. Puedo ayudarte a:</b><ul><li>Buscar propiedades y personas</li><li>Calcular actualizaciones ICL e IPC</li><li>Analizar rentabilidad</li><li>Resumir contratos</li></ul><b>¿En qué puedo ayudarte?</b></div><div className="prompts">{prompts.map(p=><button key={p}>{p}</button>)}</div><div className="chat"><input placeholder="Pregúntame algo..."/><button><Send/></button></div></section> }

createRoot(document.getElementById('root')).render(<Shell />);
