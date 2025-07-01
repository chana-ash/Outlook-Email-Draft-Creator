const express = require('express');
const multer = require('multer');
const cors = require('cors');


const nodemailer = require('nodemailer');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(cors());
const PORT = 3000;

// תיקייה זמנית לשמירת הקבצים
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DRAFTS_DIR = 'C:/Drafts'; // תיקיית הטיוטות שתיקרא ע"י Outlook

// יצירת תיקיות אם לא קיימות
fs.ensureDirSync(UPLOADS_DIR);
fs.ensureDirSync(DRAFTS_DIR);

// Middleware לקבצים (קו"ח)
const upload = multer({ dest: UPLOADS_DIR });

// Middleware לטקסט רגיל (urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/generate', upload.single('cv'), async (req, res) => {
  const { subject, body, recipients } = req.body;
  const cvFile = req.file;
  const emails = recipients.split(',').map(e => e.trim()).filter(Boolean);

  if (!subject || !body || emails.length === 0 || !cvFile) {
    return res.status(400).send('Missing required fields');
  }

  // צור טיוטה עבור כל נמען
  for (const recipient of emails) {
    const transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });

    const mailOptions = {
      from: 'you@example.com',
      to: recipient,
      subject,
      text: body,
      attachments: [
        {
          filename: cvFile.originalname,
          path: cvFile.path,
        }
      ]
    };

    const emlStream = await transporter.sendMail(mailOptions);
    const emlBuffer = emlStream.message;

    // שמירת קובץ .eml
    const fileName = `mail_${recipient.replace(/[^a-zA-Z0-9]/g, '_')}.eml`;
    const filePath = path.join(DRAFTS_DIR, fileName);
    fs.writeFileSync(filePath, emlBuffer);
  }

  // מחיקת קובץ קו"ח מהתיקייה הזמנית
  fs.removeSync(cvFile.path);

  // החזרה לפרונט שיפעיל את myapp://
  const encodedPath = encodeURIComponent(DRAFTS_DIR.replace(/\\/g, '/'));
  res.send(`myapp://open?path=${encodedPath}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
