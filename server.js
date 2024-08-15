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
        { url: 'https://api-admin-one.vercel.app' }
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
 *     summary: Masuk sebagai admin
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
 *     summary: Mengambil semua ajuan penelitian
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
 *     summary: Mengambil semua ajuan magang
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

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePenelitianRequest:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the penelitian document to be updated.
 *         nomorSurat:
 *           type: string
 *           description: The new Nomor Surat to be set. Optional.
 *         status:
 *           type: string
 *           enum: [Belum Diproses, Sedang Diproses, Sudah Selesai]
 *           description: The new status to be set. Optional.
 * 
 *     UpdateMagangRequest:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the magang document to be updated.
 *         nomorSurat:
 *           type: string
 *           description: The new Nomor Surat to be set. Optional.
 *         status:
 *           type: string
 *           enum: [Belum Diproses, Sedang Diproses, Sudah Selesai]
 *           description: The new status to be set. Optional.
 */

/**
 * @swagger
 * /api/penelitian/update:
 *   post:
 *     summary: Update Nomor Surat dan/atau Status Ajuan Penelitian
 *     tags: [Penelitian]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePenelitianRequest'
 *     responses:
 *       200:
 *         description: Dokumen berhasil diperbarui
 *       400:
 *         description: ID dan setidaknya satu dari Nomor Surat atau Status diperlukan
 *       404:
 *         description: Dokumen tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */

/**
 * @swagger
 * /api/magang/update:
 *   post:
 *     summary: UUpdate Nomor Surat dan/atau Status Ajuan Magang
 *     tags: [Magang]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMagangRequest'
 *     responses:
 *       200:
 *         description: Dokumen berhasil diperbarui
 *       400:
 *         description: ID dan setidaknya satu dari Nomor Surat atau Status diperlukan
 *       404:
 *         description: Dokumen tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
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

// Endpoint untuk memperbarui Nomor Surat dan/atau Status pada penelitian
app.post('/api/penelitian/update', async (req, res) => {
    const { id, nomorSurat, status } = req.body;

    if (!id || (!nomorSurat && !status)) {
        return res.status(400).json({ message: 'ID dan setidaknya satu dari Nomor Surat atau Status diperlukan' });
    }

    try {
        const docRef = db.collection('pelayanan').doc('penelitian').collection('data').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Dokumen tidak ditemukan' });
        }

        // Menyiapkan objek pembaruan
        const updateData = {};
        if (nomorSurat) updateData.nomorSurat = nomorSurat;
        if (status) updateData.statusAjuan = status;

        // Melakukan pembaruan pada dokumen
        await docRef.update(updateData);
        res.json({ message: 'Dokumen berhasil diperbarui' });
    } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
});

// Endpoint untuk memperbarui Nomor Surat dan/atau Status pada magang
app.post('/api/magang/update', async (req, res) => {
    const { id, nomorSurat, status } = req.body;

    if (!id || (!nomorSurat && !status)) {
        return res.status(400).json({ message: 'ID dan setidaknya satu dari Nomor Surat atau Status diperlukan' });
    }

    try {
        const docRef = db.collection('pelayanan').doc('magang').collection('magang').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Dokumen tidak ditemukan' });
        }

        // Menyiapkan objek pembaruan
        const updateData = {};
        if (nomorSurat) updateData.nomorSurat = nomorSurat;
        if (status) updateData.statusAjuan = status;

        // Melakukan pembaruan pada dokumen
        await docRef.update(updateData);
        res.json({ message: 'Dokumen berhasil diperbarui' });
    } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
});

app.get('/', (req, res) => {
    res.send('Hey this is my API running')
  });

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
