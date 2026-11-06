'use strict';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

$('#year').textContent = String(new Date().getFullYear());
const menuButton = $('#menuButton');
const mobileNav = $('#mobileNav');
function setMenu(open){ menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open?'Close menu':'Open menu'); mobileNav.hidden = !open; }
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
$$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
window.addEventListener('resize',()=>{if(window.innerWidth>950)setMenu(false);});

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{ entries.forEach((entry)=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }}); },{threshold:.08}) : null;
$$('.reveal').forEach((el)=>observer ? observer.observe(el) : el.classList.add('visible'));

// A fallback illustration is always included locally behind each externally hosted listing photo.
$$('.photo-frame > img').forEach(img=>{const showFallback=()=>{img.style.opacity='0';img.style.visibility='hidden';};img.addEventListener('error',showFallback);if(img.complete && img.naturalWidth===0)showFallback();});

const filterButtons=$$('.filter-btn');
const items=$$('.gallery-item');
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 filterButtons.forEach(btn=>{const on=btn===button;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',String(on));});
 items.forEach(item=>{item.hidden=(filter!=='all' && item.dataset.category!==filter);});
}));
const lightbox=$('#lightbox');const lightboxImage=$('#lightboxImage');const lightboxTitle=$('#lightboxTitle');const lightboxDescription=$('#lightboxDescription');const lightboxSource=$('#lightboxSource');
items.forEach(item=>item.addEventListener('click',()=>{
 const photo=item.querySelector('img');
 lightboxImage.src=(photo && photo.style.visibility==='hidden')?item.dataset.fallback:item.dataset.image;
 lightboxImage.onerror=()=>{lightboxImage.onerror=null;lightboxImage.src=item.dataset.fallback;};
 lightboxImage.alt=item.dataset.title;lightboxTitle.textContent=item.dataset.title;lightboxDescription.textContent=item.dataset.description;
 if(item.dataset.source){lightboxSource.hidden=false;lightboxSource.href=item.dataset.source;}else{lightboxSource.hidden=true;lightboxSource.removeAttribute('href');}
 if(typeof lightbox.showModal==='function')lightbox.showModal();
}));
$('#lightboxClose').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});

const checkIn=$('#checkIn');const checkOut=$('#checkOut');
function isoLocal(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`;}
const today=new Date();checkIn.min=isoLocal(today);checkOut.min=isoLocal(new Date(today.getFullYear(),today.getMonth(),today.getDate()+1));
checkIn.addEventListener('change',()=>{if(!checkIn.value)return;const d=new Date(`${checkIn.value}T12:00:00`);d.setDate(d.getDate()+1);checkOut.min=isoLocal(d);if(checkOut.value && checkOut.value<=checkIn.value)checkOut.value='';});
$('#enquiryForm').addEventListener('submit',event=>{
 event.preventDefault();const guestName=$('#guestName').value.trim();
 if(!guestName){$('#guestName').focus();$('#guestName').reportValidity();return;}
 if(!checkIn.value){checkIn.focus();checkIn.reportValidity();return;}
 if(!checkOut.value || checkOut.value<=checkIn.value){checkOut.setCustomValidity('Choose a check-out date after check-in.');checkOut.reportValidity();checkOut.setCustomValidity('');return;}
 const guests=$('#guests').value,rooms=$('#rooms').value,notes=$('#message').value.trim();
 const message=`Hello Hotel Teej,\n\nI would like to enquire about room availability.\nName: ${guestName}\nCheck-in: ${checkIn.value}\nCheck-out: ${checkOut.value}\nGuests: ${guests}\nRooms: ${rooms}${notes?`\nOther details: ${notes}`:''}\n\nPlease confirm availability, room options and current pricing. Thank you!`;
 $('#preparedMessage').value=message;$('#messageResult').hidden=false;$('#copyStatus').textContent='';$('#messageResult').scrollIntoView({behavior:'smooth',block:'nearest'});
});
$('#copyMessage').addEventListener('click',async()=>{
 try {await navigator.clipboard.writeText($('#preparedMessage').value);$('#copyStatus').textContent='Copied. Share the message when you contact the hotel.';}
 catch {$('#preparedMessage').focus();$('#preparedMessage').select();$('#copyStatus').textContent='Select and copy the highlighted message manually.';}
});
