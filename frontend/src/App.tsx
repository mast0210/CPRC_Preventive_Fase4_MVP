import { useEffect, useState } from 'react'

type Module = { slug: string; title: string; summary: string; body: string; takeaways: string[]; position: number }
type Question = { id: number; prompt: string; choices: string[]; position: number }
type Grade = { score: number; total: number; percentage: number; details: { question_id: number; selected_index: number; correct_index: number; correct: boolean; explanation: string }[] }
type Section = 'inicio' | 'aprender' | 'practicar' | 'recursos' | 'proyecto'
const API = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '')
const RESOURCES = [
  { name: 'CAI Virtual – Policía Nacional de Colombia', url: 'https://caivirtual.policia.gov.co/', desc: 'Orientación institucional sobre seguridad digital.' },
  { name: 'ColCERT – Equipo de respuesta a incidentes', url: 'https://www.colcert.gov.co/', desc: 'Información pública colombiana sobre respuesta a incidentes.' },
  { name: 'Portal de datos y normativa – MinTIC', url: 'https://www.mintic.gov.co/', desc: 'Políticas y recursos oficiales de tecnologías digitales.' },
]
async function readJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, init)
  if (!response.ok) {
    let detail = `Error HTTP ${response.status}`
    try { const error = await response.json(); detail = error.detail || detail } catch { /* red */ }
    throw new Error(detail)
  }
  return await response.json() as T
}

function App() {
  const [section,setSection] = useState<Section>('inicio')
  const [modules,setModules] = useState<Module[]>([])
  const [questions,setQuestions] = useState<Question[]>([])
  const [selectedModule,setSelectedModule] = useState<string>('fundamentos')
  const [answers,setAnswers] = useState<Record<number,number>>({})
  const [grade,setGrade] = useState<Grade | null>(null)
  const [loading,setLoading] = useState(true)
  const [submitting,setSubmitting] = useState(false)
  const [error,setError] = useState('')
  const [completed,setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('cprc-modules') || '[]') as string[] } catch { return [] }
  })
  useEffect(() => {
    Promise.all([readJson<Module[]>('/modules/'),readJson<Question[]>('/quiz/')])
      .then(([moduleData,quizData])=>{setModules(moduleData);setQuestions(quizData)})
      .catch(e=>setError(e instanceof Error?e.message:'No se pudo conectar con el servidor'))
      .finally(()=>setLoading(false))
  }, [])
  const resetQuiz = () => { setAnswers({}); setGrade(null) }
  const selectSection = (name: Section) => {setSection(name);window.scrollTo(0,0)}
  const markComplete = (slug:string) => {const next=[...new Set([...completed, slug])];setCompleted(next);localStorage.setItem('cprc-modules',JSON.stringify(next))}
  const submitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length || questions.length===0) return
    setSubmitting(true);setError('')
    try {setGrade(await readJson<Grade>('/quiz/grade/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:Object.fromEntries(Object.entries(answers).map(([k,v])=>[String(k),v]))})}))}
    catch (e) {setError(e instanceof Error?e.message:'No fue posible evaluar las respuestas')}
    finally {setSubmitting(false)}
  }
  const moduleNow = modules.find(m=>m.slug===selectedModule)
  return (
    <div className="site">
      <a className="skip" href="#contenido">Saltar al contenido principal</a>
      <header className="header"><div className="header-inner">
        <button className="brand" type="button" onClick={()=>selectSection('inicio')} aria-label="Ir al inicio">
          <span className="brand-mark">C</span><span><strong>CPRC Preventive</strong><small>Ciudadanía digital informada</small></span>
        </button>
        <nav aria-label="Secciones de la plataforma" className="nav">
          {([['inicio','Inicio'],['aprender','Aprender'],['practicar','Practicar'],['recursos','Recursos'],['proyecto','Proyecto']] as const).map(([id,label])=>(
            <button key={id} type="button" aria-current={section===id?'page':undefined} onClick={()=>selectSection(id)}>{label}</button>
          ))}
        </nav>
      </div></header>
      <main id="contenido">
      {section==='inicio' && <>
        <section className="hero"><div className="hero-content"><div className="eyebrow"><span className="dot"/> PROTOTIPO EDUCATIVO · FASE 4</div>
          <h1>Piensa, verifica y <span>protege tu información.</span></h1>
          <p>Aprende a reconocer señales de phishing y engaños potenciados con inteligencia artificial. Practica decisiones seguras en un entorno educativo, sin exponer información personal.</p>
          <div className="hero-actions"><button className="btn primary" type="button" onClick={()=>selectSection('aprender')}>Comenzar a aprender <span aria-hidden="true">→</span></button><button className="btn outline" type="button" onClick={()=>selectSection('practicar')}>Realizar práctica</button></div>
          <div className="hero-notice"><span aria-hidden="true">✓</span> Las actividades son simuladas y no solicitan credenciales ni códigos reales.</div>
        </div><div className="hero-art" aria-hidden="true"><div className="shield">✦<span>PROTECCIÓN DIGITAL</span></div><div className="floating floating-a">Verificar identidad <b>✓</b></div><div className="floating floating-b">Privacidad primero <b>✓</b></div></div></section>
        <div className="stats"><div><strong>03</strong><span>módulos educativos</span></div><div><strong>05</strong><span>situaciones de práctica</span></div><div><strong>100%</strong><span>aprendizaje sin datos personales</span></div></div>
        <section className="section wrap"><div className="section-intro"><div><span className="kicker">LA RUTA</span><h2>Aprende en tres pasos</h2></div><p>Contenidos breves, actividades y recursos oficiales para consultar cuando los necesites.</p></div>
          <div className="cards"><article className="info-card"><span className="card-emoji">◈</span><small>01 · RECONOCER</small><h3>Comprende los riesgos</h3><p>Identifica qué es phishing y por qué la apariencia de un mensaje no garantiza su legitimidad.</p></article><article className="info-card"><span className="card-emoji">✧</span><small>02 · VERIFICAR</small><h3>Practica decisiones</h3><p>Resuelve situaciones educativas y recibe retroalimentación detallada.</p></article><article className="info-card"><span className="card-emoji">▣</span><small>03 · PREVENIR</small><h3>Consulta fuentes fiables</h3><p>Accede a recursos públicos de orientación en seguridad digital.</p></article></div>
        </section>
        <section className="banner wrap"><div><span className="kicker">RECUERDA</span><h2>La urgencia no es una prueba de autenticidad.</h2><p>Si una comunicación inesperada pide contraseñas, códigos o datos personales, confirma su legitimidad mediante un canal oficial independiente.</p></div><button className="btn light" type="button" onClick={()=>selectSection('practicar')}>Ponerlo en práctica →</button></section>
      </>}
      {section==='aprender' && <section className="section wrap content-section"><span className="kicker">MÓDULOS EDUCATIVOS</span><h1 className="page-title">Aprende a detectar señales</h1><p className="lead">Contenidos de demostración basados en principios generales de prevención. El diagnóstico ciudadano del proyecto sigue siendo una investigación separada.</p>
        {loading ? <p role="status">Cargando módulos…</p> : null}
        {error && !modules.length && <div className="alert" role="alert">No se pudieron cargar los módulos. Comprueba que el servidor Django esté iniciado. {error}</div>}
        {!!modules.length && <div className="learning-layout"><div className="learning-nav" aria-label="Selecciona un módulo">{modules.map((m,i)=><button type="button" className={m.slug===selectedModule?'active':''} key={m.slug} onClick={()=>setSelectedModule(m.slug)}><span>{String(i+1).padStart(2,'0')}</span>{m.title}{completed.includes(m.slug)?<b aria-label="Completado">✓</b>:null}</button>)}</div>
          {moduleNow && <article className="learning-detail"><div className="module-label">MÓDULO {moduleNow.position+1} DE {modules.length}</div><h2>{moduleNow.title}</h2><p className="module-summary">{moduleNow.summary}</p><p>{moduleNow.body}</p><h3>Ideas clave</h3><ul className="takeaways">{moduleNow.takeaways.map((x,i)=><li key={i}><span aria-hidden="true">✓</span>{x}</li>)}</ul><div className="module-actions"><button type="button" className="btn primary" onClick={()=>markComplete(moduleNow.slug)}>{completed.includes(moduleNow.slug)?'Módulo completado ✓':'Marcar como leído'}</button><button className="btn outline" onClick={()=>selectSection('practicar')} type="button">Ir a la práctica →</button></div></article>}
        </div>}
      </section>}
      {section==='practicar' && <section className="section wrap content-section quiz-page"><span className="kicker">PRÁCTICA SEGURA</span><h1 className="page-title">Toma decisiones con criterio</h1><p className="lead">Responde cinco situaciones educativas. No hay enlaces sospechosos activos ni formularios para ingresar contraseñas.</p>
        {loading && <p role="status">Cargando práctica…</p>}
        {error && <div className="alert" role="alert">{error}</div>}
        {!!questions.length && <><div className="quiz-meta"><span>{Object.keys(answers).length} de {questions.length} respondidas</span><span>Respuestas verificadas por el servidor</span></div><div className="progress" role="progressbar" aria-valuenow={Object.keys(answers).length} aria-valuemin={0} aria-valuemax={questions.length}><div style={{width:`${Object.keys(answers).length/questions.length*100}%`}}/></div>
          {questions.map((q,i)=><fieldset className="question" key={q.id} disabled={!!grade}><legend><span>Pregunta {i+1}</span>{q.prompt}</legend><div className="choices">{q.choices.map((choice,index)=><label key={index} className={answers[q.id]===index?'chosen':''}><input type="radio" name={`q-${q.id}`} checked={answers[q.id]===index} onChange={()=>setAnswers(a=>({...a,[q.id]:index}))}/><span className="radio-icon" aria-hidden="true"/>{choice}</label>)}</div>{grade?.details.find(d=>d.question_id===q.id) && <div className={`feedback ${grade.details.find(d=>d.question_id===q.id)?.correct?'correct':'incorrect'}`}><strong>{grade.details.find(d=>d.question_id===q.id)?.correct?'Respuesta acertada':'Oportunidad de aprendizaje'}</strong><p>{grade.details.find(d=>d.question_id===q.id)?.explanation}</p></div>}</fieldset>)}
          {grade ? <div className="result" role="status"><span className="kicker">RESULTADO DE LA PRÁCTICA</span><h2>{grade.score} de {grade.total} respuestas correctas</h2><p>Porcentaje: {grade.percentage}%. Este resultado no sustituye el diagnóstico de investigación ni demuestra por sí solo eficacia educativa.</p><button className="btn primary" type="button" onClick={resetQuiz}>Volver a practicar</button></div> : <div className="quiz-submit"><p>Confirma que has respondido todas las preguntas.</p><button type="button" className="btn primary" disabled={submitting||Object.keys(answers).length!==questions.length} onClick={submitQuiz}>{submitting?'Evaluando…':'Finalizar y ver resultados →'}</button></div>}
        </>}
      </section>}
      {section==='recursos' && <section className="section wrap content-section"><span className="kicker">FUENTES OFICIALES</span><h1 className="page-title">Recursos para orientarte</h1><p className="lead">Consulta estos portales en sus direcciones oficiales. Son enlaces externos; no constituyen canales de denuncia internos de CPRC Preventive.</p><div className="resource-list">{RESOURCES.map(item=><article key={item.url}><div className="resource-icon">↗</div><div><h2>{item.name}</h2><p>{item.desc}</p><a href={item.url} target="_blank" rel="noopener noreferrer">Visitar portal oficial <span aria-hidden="true">↗</span></a></div></article>)}</div><div className="alert quiet"><strong>Privacidad:</strong> CPRC Preventive no solicita contraseñas, códigos temporales, tarjetas ni documentos de identidad.</div></section>}
      {section==='proyecto' && <section className="section wrap content-section"><span className="kicker">CONTEXTO ACADÉMICO</span><h1 className="page-title">Acerca de CPRC Preventive</h1><p className="lead">Prototipo académico del programa Ingeniería de Sistemas de la Universidad Nacional Abierta y a Distancia (UNAD).</p><div className="about-grid"><article className="about-card"><h2>Objetivo del proyecto</h2><p>Diagnosticar conocimiento, percepción del riesgo y conductas preventivas frente al phishing y la ingeniería social potenciada por IA en ciudadanos de Bogotá D. C. de 18 a 45 años, y formular recomendaciones de sensibilización.</p></article><article className="about-card"><h2>Alcance de esta demostración</h2><p>Interfaz de módulos, práctica con retroalimentación, enlaces institucionales y servicios de API. Este prototipo no sustituye las encuestas o entrevistas del diseño de investigación mixto.</p></article><article className="about-card"><h2>Metodologías</h2><p>CDIO organiza el desarrollo tecnológico, Design Thinking orienta el diseño centrado en usuarios y Scrum permite documentar incrementos y pruebas. La metodología de investigación DEXPLIS es independiente.</p></article><article className="about-card"><h2>Uso responsable</h2><p>Las situaciones son educativas y ficticias. No se almacenan respuestas individuales identificables. La API registra únicamente una puntuación agregada por intento de práctica.</p></article></div></section>}
      </main>
      <footer className="footer"><div className="wrap footer-inner"><div><strong>CPRC Preventive</strong><p>Prototipo académico de sensibilización · UNAD · 2026</p></div><p>Verifica antes de compartir. Aprende antes de actuar.</p></div></footer>
    </div>
  )
}
export default App
