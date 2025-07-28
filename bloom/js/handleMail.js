export function sendMail(){
    event.preventDefault();
    let serviceId = "service_1wpctym";
    let templateId = "template_b1k85x5";
    let parms = {
        name : document.querySelector("#name").value,
        email : document.querySelector("#email").value,
        subject : document.querySelector("#subject").value,
        message : document.querySelector("#message").value,
    }
    emailjs.send(serviceId, templateId, parms).then(alert('Message Sent'));
}