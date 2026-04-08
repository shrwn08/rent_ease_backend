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

export const getMyRequests = async (req, res, next) => {
  try {
    const requests = await MaintenanceRequest.find({ user: req.user._id })
      .populate('product', 'name imageUrl')
      .sort('-createdAt');
 
    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    next(error);
  }
};

// Get all maintenance requests (Admin)

export const getAllRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;
 
    const requests = await MaintenanceRequest.find(query)
      .populate('user', 'name email phone')
      .populate('product', 'name imageUrl category')
      .sort('-createdAt');
 
    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    next(error);
  }
};


// Update maintenance request status (Admin)

export const updateRequest = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
 
    const updateData = { status, adminNotes };
    if (status === 'resolved') updateData.resolvedAt = new Date();
 
    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'name email').populate('product', 'name');
 
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }
 
    res.json({ success: true, message: 'Request updated.', request });
  } catch (error) {
    next(error);
  }
};