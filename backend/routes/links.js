import express from 'express';
import { 
  getLinks, 
  insertOrUpdateLink, 
  deleteLink,
  incrementClicks
} from '../controllers/linkController.js';
import { validateLink } from '../middleware/validation.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/links/getList:
 *   get:
 *     summary: Get All Links
 *     description: Retrieve all dashboard links with optional filtering by type (e.g., social, resource, etc.)
 *     tags: [Links]
 *     operationId: getAllLinks
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter links by type (e.g., 'social', 'resource', 'all')
 *         example: social
 *     responses:
 *       200:
 *         description: Links retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     links:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Link'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalLinks:
 *                           type: integer
 *                         hasNext:
 *                           type: boolean
 *                         hasPrev:
 *                           type: boolean
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/getList', getLinks);

/**
 * @swagger
 * /api/links/InsertUpdate:
 *   post:
 *     summary: Insert or Update Link
 *     description: Create a new link or update an existing link. Set id=0 for INSERT, provide actual id for UPDATE. Requires authentication.
 *     tags: [Links]
 *     operationId: insertOrUpdateLink
 *     security:
 *       - bearerAuth: []
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - linkname
 *               - link
 *               - linktype
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Link ID - Use 0 for INSERT (new link), provide actual ID for UPDATE
 *                 example: 0
 *               linkname:
 *                 type: string
 *                 description: Name of the link
 *                 example: Facebook Page
 *               link:
 *                 type: string
 *                 format: uri
 *                 description: URL of the link
 *                 example: https://facebook.com/pakkacourse
 *               linktype:
 *                 type: string
 *                 description: Type/category of the link (e.g., social, resource, documentation)
 *                 example: social
 *               displayorder:
 *                 type: integer
 *                 description: Display order for the link (optional, auto-generated if not provided)
 *                 example: 1
 *           examples:
 *             insertNewLink:
 *               summary: Insert new link
 *               value:
 *                 id: 0
 *                 linkname: Facebook Page
 *                 link: https://facebook.com/pakkacourse
 *                 linktype: social
 *                 displayorder: 1
 *             updateExistingLink:
 *               summary: Update existing link
 *               value:
 *                 id: 5
 *                 linkname: Updated Facebook Page
 *                 link: https://facebook.com/pakkacourse-updated
 *                 linktype: social
 *     responses:
 *       200:
 *         description: Link processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                       enum: [created, updated]
 *                     link:
 *                       $ref: '#/components/schemas/Link'
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/InsertUpdate', auth, insertOrUpdateLink);

/**
 * @swagger
 * /api/links/ClickCount:
 *   post:
 *     summary: Increment Link Clicks
 *     description: Increments the 'clicks' counter for a specified link ID by one. Requires authentication.
 *     tags: [Links]
 *     operationId: incrementLinkClicks
 *     security:
 *       - bearerAuth: []
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - linkId
 *             properties:
 *               linkId:
 *                 type: integer
 *                 description: The ID of the link whose click count should be incremented.
 *                 example: 5
 *           examples:
 *             incrementClickCount:
 *               summary: Increment Clicks
 *               value:
 *                 linkId: 5
 *     responses:
 *       200:
 *         description: Click count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Clicks successfully incremented for Link ID: 5"
 *       400:
 *         description: Bad request - Link ID missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error while processing the click update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/ClickCount', incrementClicks);

/**
 * @swagger
 * /api/links/{id}:
 *   delete:
 *     summary: Delete Link
 *     description: Permanently delete a link by its ID. Requires authentication.
 *     tags: [Links]
 *     operationId: deleteLink
 *     security:
 *       - bearerAuth: []
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Link ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request - Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', auth, deleteLink);

export default router;