"use client";
import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";

export function ContactForm(){
 const [notice,setNotice]=useState(false);
 function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); const form=e.currentTarget;if(!form.checkValidity()){form.reportValidity();return}setNotice(true)}
 return <form className="contact-form" onSubmit={submit} noValidate={false}>
  <div className="form-note"><Info size={18}/><p>This form is a demo and is not connected yet. You can also email <a href="mailto:hello@projectecon.org">hello@projectecon.org</a> (placeholder).</p></div>
  <div className="field-grid"><label>Name<input name="name" required autoComplete="name"/></label><label>Business or organization name<input name="organization" required/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Phone number <span>Optional</span><input name="phone" type="tel" autoComplete="tel"/></label></div>
  <label>Type of business or organization<select name="type" required defaultValue=""><option value="" disabled>Select one</option>{["Small business","Nonprofit","Community organization","School or educational organization","Local event or program","Other"].map(x=><option key={x}>{x}</option>)}</select></label>
  <label>Website or social media <span>Optional</span><input name="website" type="url" placeholder="https://"/></label>
  <label>What problem are you currently facing?<textarea name="problem" required rows={5}/></label>
  <div className="field-grid"><label>How long have you been facing this problem?<input name="duration" required/></label><label>Preferred way to contact you<select name="contactMethod" required defaultValue=""><option value="" disabled>Select one</option>{["Email","Phone call","Text","In-person meeting"].map(x=><option key={x}>{x}</option>)}</select></label></div>
  <label>What have you already tried?<textarea name="tried" required rows={4}/></label><label>Additional information <span>Optional</span><textarea name="additional" rows={4}/></label>
  <label className="checkbox"><input type="checkbox" required/><span>I understand that Project Econ is student-led and cannot guarantee results.</span></label>
  <button className="button" type="submit">Review demo submission <ArrowRight size={18}/></button>
  {notice&&<div className="demo-notice" role="status"><strong>Your information is filled out correctly.</strong><p>This demo form has not sent anything. Connect a form service before accepting submissions.</p></div>}
 </form>
}
