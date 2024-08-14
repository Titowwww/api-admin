const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Initialization
const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://govservice-2024.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'ADMIN API Documentation',
        description: 'API Information',
        version: '1.0.0',
        contact: {
          name: 'Mikey',
        },
      },
      servers: [
        { url: 'http://localhost:3000' },
        { url: 'https://api-admin-delta.vercel.app' }
      ],
    },
    apis: ['server.js'], // Path to the API docs
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
  // Use the latest Swagger UI bundle from a CDN
  const customCssUrl = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css';
  const customJs = [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
  ];
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCssUrl,
    customJs,
  }));

  /**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /login-admin:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

  /**
 * @swagger
 * components:
 *   schemas:
 *     Penelitian:
 *       type: object
 *       required:
 *         - letterNumber
 *         - name
 *         - researcherName
 *         - address
 *         - inputValue
 *         - institution
 *         - occupation
 *         - judulPenelitian
 *         - researchField
 *         - tujuanPenelitian
 *         - supervisorName
 *         - teamMembers
 *         - statusPenelitian
 *         - researchPeriod
 *         - researchLocation
 *       properties:
 *         letterNumber:
 *           type: string
 *         name:
 *           type: string
 *         researcherName:
 *           type: string
 *         address:
 *           type: string
 *         inputValue:
 *           type: string
 *         institution:
 *           type: string
 *         occupation:
 *           type: string
 *         judulPenelitian:
 *           type: string
 *         researchField:
 *           type: string
 *         tujuanPenelitian:
 *           type: string
 *         supervisorName:
 *           type: string
 *         teamMembers:
 *           type: string
 *         statusPenelitian:
 *           type: string
 *         researchPeriod:
 *           type: string
 *         researchLocation:
 *           type: string
 *         ktpUrl:
 *           type: string
 *         suratPengantarUrl:
 *           type: string
 *         proposalUrl:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/penelitian:
 *   get:
 *     summary: Get all research submissions
 *     tags: [Penelitian]
 *     responses:
 *       200:
 *         description: Successfully retrieved research submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Penelitian'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Magang:
 *       type: object
 *       required:
 *         - letterNumber
 *         - applicantsName
 *         - address
 *         - inputValue
 *         - institution
 *         - occupation
 *         - judul
 *         - supervisorName
 *         - tujuanPermohonan
 *         - teamMembers
 *         - statusPermohonan
 *         - period
 *         - location
 *       properties:
 *         letterNumber:
 *           type: string
 *         applicantsName:
 *           type: string
 *         address:
 *           type: string
 *         inputValue:
 *           type: string
 *         institution:
 *           type: string
 *         occupation:
 *           type: string
 *         judul:
 *           type: string
 *         supervisorName:
 *           type: string
 *         tujuanPermohonan:
 *           type: string
 *         teamMembers:
 *           type: string
 *         statusPermohonan:
 *           type: string
 *         period:
 *           type: string
 *         location:
 *           type: string
 *         ktpUrl:
 *           type: string
 *         suratPermohonanUrl:
 *           type: string
 *         proposalUrl:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/magang:
 *   get:
 *     summary: Get all internship submissions
 *     tags: [Magang]
 *     responses:
 *       200:
 *         description: Successfully retrieved internship submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Magang'
 *       500:
 *         description: Internal server error
 */

// login-admin
app.post('/login-admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminDoc = await db.collection('pelayanan').doc('admin').get();

        if (!adminDoc.exists) {
            return res.status(401).json({ message: 'Username atau Password salah' });
        }

        const adminData = adminDoc.data();

        if (adminData.username === username && adminData.password === password) {
            res.json({ message: 'Login Sukses' });
        } else {
            res.status(401).json({ message: 'Username atau Password salah' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Username atau Password salah' });
    }
});
// Rute untuk mengambil data dari Firestore dan mengembalikan dalam format JSON
app.get('/api/penelitian', async (req, res) => {
    try {
        console.log('Fetching data from Firestore...');
        const snapshot = await db.collection('pelayanan').doc('penelitian').collection('data').get();
        
        const items = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                letterNumber: data.letterNumber,
                name: data.name,
                researcherName : data.researcherName,
                address : data.address,
                inputValue : data.inputValue,
                institution : data.institution,
                occupation : data.occupation,
                judulPenelitian : data.judulPenelitian,
                researchField : data.researchField,
                tujuanPenelitian: data.tujuanPenelitian,
                supervisorName : data.supervisorName,
                teamMembers : data.teamMembers,
                statusPenelitian : data.statusPenelitian,
                researchPeriod : data.researchPeriod,
                researchLocation : data.researchLocation,
                ktpUrl: data.ktpUrl,  // Menggunakan URL publik langsung
                suratPengantarUrl: data.suratPengantarUrl,  // Menggunakan URL publik langsung
                proposalUrl: data.proposalUrl,  // Menggunakan URL publik langsung
                timestamp: data.timestamp.toDate()
            };
        });

        console.log('Data fetched successfully.');
        res.json(items);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/magang', async (req, res) => {
    try {
        console.log('Fetching data from Firestore...');
        const snapshot = await db.collection('pelayanan').doc('magang').collection('magang').get();
        
        const items = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                letterNumber : data.letterNumber,
                applicantsName : data.applicantsName,
                address : data.address,
                inputValue : data.inputValue,
                institution : data.institution,
                occupation : data.occupation,
                judul : data.judul,
                tujuanPermohonan: data.tujuanPermohonan,
                supervisorName : data.supervisorName,
                teamMembers : data.teamMembers,
                statusPermohonan : data.statusPermohonan,
                period : data.period,
                location : data.location,
                tujuanPermohonan: data.tujuanPermohonan,
                ktpUrl: data.ktpUrl,  // Menggunakan URL publik langsung
                suratPermohonanUrl: data.suratPermohonanUrl,  // Menggunakan URL publik langsung
                proposalUrl: data.proposalUrl,  // Menggunakan URL publik langsung
                timestamp: data.timestamp.toDate()
            };
        });

        console.log('Data fetched successfully.');
        res.json(items);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Hey this is my API running')
  });

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
