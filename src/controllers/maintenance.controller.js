import MaintenanceRequest from "../models/maintenanceRequest.model.js"

import Product from "../models/product.model.js"

export const createRequest = async (req, res, next) => {
  try {
    const { productId, orderId, issueType, description, priority } = req.body;
 
    if (!productId || !issueType || !description) {
      return res.status(400).json({ success: false, message: 'Product, issue type, and description are required.' });
    }
 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
 
    const request = await MaintenanceRequest.create({
      user: req.user._id,
      product: productId,
      order: orderId || null,
      productName: product.name,
      issueType,
      description,
      priority: priority || 'medium',
    });
 
    res.status(201).json({
      success: true,
      message: 'Maintenance request submitted successfully.',
      request,
    });
  } catch (error) {
    next(error);
  }
};
 
// Get current user's maintenance requests

const getMyRequests = async (req, res, next) => {
  try {
    const requests = await MaintenanceRequest.find({ user: req.user._id })
      .populate('product', 'name imageUrl')
      .sort('-createdAt');
 
    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    next(error);
  }
};