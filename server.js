const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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

// Tambahkan ini untuk JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;


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
 * /api/protected-route:
 *   get:
 *     summary: Mengakses rute yang dilindungi (Protected Route)
 *     description: Endpoint ini hanya dapat diakses oleh pengguna yang telah diautentikasi dengan token JWT.
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to protected route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: admin
 *       401:
 *         description: Invalid token
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Mengambil username pengguna yang sedang login
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Username pengguna yang sedang login
 *                   example: "pelayanan1"
 *       401:
 *         description: Token tidak valid atau tidak ada token
 *       403:
 *         description: Token diperlukan untuk otentikasi
 *       500:
 *         description: Kesalahan server internal
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
 *         nomorSurat:
 *           type: string
 *         statusAjuan:
 *           type: string
 *           enum: [Belum Diproses, Sedang Diproses, Sudah Selesai]
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
 *         nomorSurat:
 *           type: string
 *         statusAjuan:
 *           type: string
 *           enum: [Belum Diproses, Sedang Diproses, Sudah Selesai]
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
 *         statusAjuan:
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
 *         statusAjuan:
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
 *     summary: Update Nomor Surat dan/atau Status Ajuan Magang
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

// login-admin dengan JWT
app.post('/login-admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminDoc = await db.collection('pelayanan').doc('admin').get();

        if (!adminDoc.exists) {
            return res.status(401).json({ message: 'Username atau Password salah' });
        }

        const adminData = adminDoc.data();

        if (adminData.username === username && adminData.password === password) {
            // Jika login sukses, buat token
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            
            // Decode token untuk mendapatkan iat dan exp
            const decodedToken = jwt.decode(token);

            // Konversi iat dan exp menjadi format tanggal dan waktu yang mudah dibaca
            const iatReadable = new Date(decodedToken.iat * 1000).toLocaleString();
            const expReadable = new Date(decodedToken.exp * 1000).toLocaleString();
            
            res.json({ 
                message: 'Login Sukses', 
                token,
                iat : iatReadable,
                exp : expReadable
            });
        } else {
            res.status(401).json({ message: 'Username atau Password salah' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Middleware untuk memverifikasi token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    const token = authHeader.split(' ')[1]; // Mengambil token setelah 'Bearer'
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

// Endpoint untuk mengambil username pengguna yang sedang login
app.get('/profile', verifyToken, (req, res) => {
    try {
        // Ambil username dari token JWT yang terverifikasi
        const username = req.user.username;

        // Kembalikan username sebagai respon
        res.json({
            username: username
        });
    } catch (err) {
        console.error('Error fetching username:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Rute yang menggunakan token JWT harus menggunakan middleware ini
app.get('/api/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Rute untuk mengambil data dari Firestore dan mengembalikan dalam format JSON
app.get('/api/penelitian', async (req, res) => {
    try {
        console.log('Fetching data from Firestore...');
        const snapshot = await db.collection('pelayanan').doc('penelitian').collection('data').get();
        
        const items = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;  // Mengambil ID dokumen

            return {
                id,  // Menambahkan ID ke objek yang dikembalikan
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
                timestamp: data.timestamp.toDate(),
                statusAjuan: data.statusAjuan,
                nomorSurat: data.nomorSurat,
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
            const id = doc.id;  // Mengambil ID dokumen

            return {
                id,  // Menambahkan ID ke objek yang dikembalikan
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
                timestamp: data.timestamp.toDate(),
                statusAjuan: data.statusAjuan,
                nomorSurat: data.nomorSurat,
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
    console.log("Request body:", req.body); // Debugging log
    const { id, nomorSurat, statusAjuan } = req.body;

    if (!id || (!nomorSurat && !statusAjuan)) {
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
        if (statusAjuan) updateData.statusAjuan = statusAjuan;

        // Melakukan pembaruan pada dokumen
        const updatedDoc = await docRef.get(); // Ambil dokumen yang diperbarui
        res.json({ 
            message: 'Dokumen berhasil diperbarui',
            data: updatedDoc.data() // Mengembalikan data yang diperbarui
        });
    } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
});

// Endpoint untuk memperbarui Nomor Surat dan/atau Status pada magang
app.post('/api/magang/update', async (req, res) => {
    console.log("Request body:", req.body); // Debugging log
    const { id, nomorSurat, statusAjuan } = req.body;
    
    // Logging tambahan untuk memastikan data yang diterima
    console.log("Received ID:", id);
    console.log("Received Nomor Surat:", nomorSurat);
    console.log("Received Status Ajuan:", statusAjuan);
    
    if (!id || (!nomorSurat && !statusAjuan)) {
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
        if (statusAjuan) updateData.statusAjuan = statusAjuan;
        console.log("Nomor Surat:", nomorSurat);
        console.log("Status Ajuan:", statusAjuan);


        // Melakukan pembaruan pada dokumen
        const updatedDoc = await docRef.get(); // Ambil dokumen yang diperbarui
        res.json({ 
            message: 'Dokumen berhasil diperbarui',
            data: updatedDoc.data() // Mengembalikan data yang diperbarui
        });
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

