document.getElementById("emailForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const recipientsRaw = document.getElementById("recipients").value;
  const body = document.getElementById("body").value;
  const attachment = document.getElementById("attachment").files[0];

  const recipients = recipientsRaw.split(",").map(email => email.trim()).filter(email => email);

  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("body", body);
  formData.append("recipients", recipients.join(","));
  if (attachment) {
    formData.append("cv", attachment);
  }

  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      body: formData
    });

    const result = await res.text();
    if (result.startsWith("myapp://")) {
      window.location.href = result;
    } else {
      alert("הבקשה נשלחה אך לא התקבלה כתובת תקינה לפתיחה");
    }
  } catch (err) {
    console.error("שגיאה בשליחה:", err);
    alert("אירעה שגיאה בשליחת הטופס");
  }
});
