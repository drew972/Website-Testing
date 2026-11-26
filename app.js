const origin = 'https://easylr24.com'
const main = document.querySelector('main')
const professions = ['Electricians','Barbers & Cosmetology','Air Conditioning','Auctioneer','Property Tax Consultant','Towing Operator']
const paths = [
  'M13 2 4 14h6l-1 8 11-14h-7z',
  'M5 3l14 17M19 3 9 15M5 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm14 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  'M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h5a2 2 0 1 1-2 2',
  'm7 4 3-3 8 8-3 3zM12 8l-9 9 2 2 9-9M13 19h8v2h-8z',
  'M5 21V3h11l3 3v15zM8 8h7M8 12h8M8 16h5',
  'M2 6h12v10H2zM14 10h4l4 4v2h-8M7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm13 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
]
const escapeHtml = value => String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))
function catalogLink(state='',profession='') {
  return '#catalog?' + new URLSearchParams({state,profession}).toString()
}
function finder(state='',profession='') {
  const field = (key,label,items,value) => '<label class="field">'+label+'<select name="'+key+'"><option value="">All '+(key==='state'?'states':'professions')+'</option>'+items.map(item=>'<option '+(item===value?'selected':'')+'>'+escapeHtml(item)+'</option>').join('')+'</select></label>'
  return '<form class="finder"><h2>Course finder</h2>'+field('state','Licensing state',['Texas','North Carolina'],state)+field('profession','Profession',professions,profession)+'<button class="btn">Find courses</button></form>'
}
const supportBanner = '<section class="banner"><div><h2>Need a hand choosing a course?</h2><p>Speak with the EasyLR24 student support team.</p></div><a class="outline" href="tel:18887230490">Call 888-723-0490</a></section>'
function home() {
  return '<div class="wrap"><section class="hero"><div class="hero-copy"><span class="eyebrow">Online continuing education</span><h1>Your license.<br><em>Your pace.</em></h1><p>Find continuing education for your profession. Study online when it fits your workday.</p></div><img class="hero-img" src="workshop.jpg" alt="A trades professional studying on a tablet in a workshop"></section>'+finder()+'<section><div class="sectionhead"><h2>Browse by profession</h2><a href="#catalog">View all courses</a></div><div class="grid">'+professions.map((p,i)=>{
    const count=courses.filter(c=>c.profession===p).length
    return '<a class="tile" href="'+catalogLink('',p)+'"><span class="glyph"><svg aria-hidden="true" class="icon" viewBox="0 0 24 24"><path d="'+paths[i]+'"/></svg></span><div><h3>'+escapeHtml(p)+'</h3><small>'+count+' course'+(count===1?'':'s')+'</small></div></a>'
  }).join('')+'</div></section>'+supportBanner+'</div>'
}
function layout(title,content,back='<a class="back" href="#home">Home</a>') {
  return '<div class="wrap inner">'+back+'<h1>'+escapeHtml(title)+'</h1>'+content+'</div>'
}
function catalog(params) {
  const state=params.get('state')||'',profession=params.get('profession')||''
  const matches=courses.filter(c=>(!state||c.state===state)&&(!profession||c.profession===profession))
  return layout('Course catalog',finder(state,profession)+'<div class="sectionhead"><h2>'+matches.length+' course'+(matches.length===1?'':'s')+'</h2>'+(state||profession?'<a href="#catalog">Clear filters</a>':'')+'</div>'+(matches.length?'<div class="grid">'+matches.map(c=>'<article class="card"><p class="kicker">'+c.state+' · '+escapeHtml(c.profession)+'</p><h3>'+escapeHtml(c.title)+'</h3><p>'+c.hours+' credit hours · '+c.price+'</p><a class="outline" href="#course/'+courses.indexOf(c)+'?'+escapeHtml(params)+'">Course details</a></article>').join('')+'</div>':'<p>There are no courses for this combination. Choose another state or profession.</p>'))
}
function course(index,params) {
  const c=courses[index]
  if(!c) return catalog(params)
  return layout(c.title,'<article class="article"><p class="kicker">'+c.state+' · '+escapeHtml(c.profession)+'</p><h2 style="margin-top:12px">'+c.hours+' credit hours</h2><p>Study online at your own pace and access your completion certificate through your student account.</p><p><strong>Course price '+c.price+'</strong><br>Catalog offer: '+c.discount+' with code DC22.</p><div class="buttons"><a class="btn" href="'+c.url+'">View syllabus &amp; enroll</a><a href="#contact">Ask about this course</a></div></article>','<a class="back" href="#catalog?'+escapeHtml(params)+'">Back to course catalog</a>')
}
const questions=[
  ['How do I choose a course?','Select your licensing state and profession in the course finder. Open a course to check the credit hours, then review its syllabus and enrollment details.'],
  ['Can I study at different times?','Yes. Courses are online and available around the clock. Sign back in to continue from your student account.'],
  ['Where is my certificate?','Sign in to your student account and open your completed courses to access and print your certificate.'],
  ['How do I reset my password?','Use the <a href="https://easylr24.com/Member/ForgotPassword">password recovery page</a> to regain access to your account.'],
  ['How does price matching work?','Call 888-723-0490 with the comparable course offer. The team can check eligibility and explain the discount.']
]
const article = body=>'<section class="article">'+body+'</section>'
const pages={
  help:()=>layout('Help center',article('<h2>Frequently asked questions</h2>'+questions.map(([q,a])=>'<details><summary>'+q+'</summary><p>'+a+'</p></details>').join('')+'<div class="buttons"><a href="'+origin+'/Faqs">Full FAQ library</a><a href="'+origin+'/Support">Technical support</a></div>')+supportBanner),
  account:()=>layout('Student account',article('<h2>Continue your course</h2><p>Open your student dashboard to resume a lesson, check your progress or print a certificate.</p><div class="buttons"><a class="btn" href="'+origin+'/Member/Login">Sign in to EasyLR24</a><a href="'+origin+'/Member/ForgotPassword">Forgot password?</a></div>')+article('<h2>New student?</h2><div class="buttons"><a href="'+origin+'/Member/Registration">Create an account</a><a href="#catalog">Explore courses</a></div>')),
  contact:()=>layout('Contact us',article('<h2>Student support</h2><p>For questions about enrollment, your account or a course, call <a href="tel:18887230490">888-723-0490</a>. For technical support, call <a href="tel:12104851492">210-485-1492</a>.</p><p>Prefer to write? Include the course name and your licensing state so the team can help.</p><a class="btn" href="'+origin+'/ContactUs">Open contact form</a>')),
  about:()=>layout('About EasyLR24',article('<h2>Continuing education for working professionals</h2><p>EasyLR24 Online Training School offers online continuing education across six professions. The catalog includes courses for Texas and North Carolina, with availability specific to each license.</p><p>Choose a course, enroll online and study around your work schedule. You can return to your lessons and print a certificate after completion.</p><div class="buttons"><a class="btn" href="#catalog">Browse courses</a><a href="#reviews">Student experiences</a></div>')),
  reviews:()=>layout('Student experiences',article('<p class="kicker">Electrical continuing education</p><blockquote>“This is the 3rd year in a row I\'ve taken your course. Looking forward to #4.”</blockquote><p>Mark, electrician · September 2014</p>')+article('<h2>More student reviews</h2><p>Read experiences from returning cosmetology, towing and auctioneer students.</p><a class="btn" href="'+origin+'/Testimonials">Read all testimonials</a>'))
}
function render() {
  const [route,query='']=location.hash.slice(1).split('?')
  if(route==='main')return
  const params=new URLSearchParams(query)
  if(route==='catalog')main.innerHTML=catalog(params)
  else if(/^course\/\d+$/.test(route))main.innerHTML=course(Number(route.slice(7)),params)
  else main.innerHTML=Object.hasOwn(pages,route)?pages[route]():home()
  document.title=main.querySelector('h1').innerText.replace(/\s+/g,' ')+' · EasyLR24'
  for(const a of document.querySelectorAll('header nav a')){
    if(a.hash==='#'+route)a.setAttribute('aria-current','page')
    else a.removeAttribute('aria-current')
  }
  window.scrollTo(0,0)
}
main.addEventListener('submit',event=>{
  if(!event.target.matches('.finder'))return
  event.preventDefault()
  const data=new FormData(event.target)
  location.hash=catalogLink(data.get('state'),data.get('profession'))
})
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus()})
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true})})
render()
