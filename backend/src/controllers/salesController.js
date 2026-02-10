const Sale = require("../models/Sale");

// Adding a new sale record
exports.addSale = async (req, res) => {
  try {
    const { agentName, amount, salesCount } = req.body;

    // For Validation
    if (!agentName || !amount) {
      return res.status(400).json({
        success: false,
        message: "Agent name and amount are required",
      });
    }

    // For Creating a new sale
    const sale = await Sale.create({
      agentName: agentName.trim(),
      amount: Number(amount),
      salesCount: salesCount || 1,
    });

    res.status(200).json({
      success: true,
      message: "Sale added successfully",
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding sale",
      error: error.message,
    });
  }
};

// To get the leaderboard with aggregation
exports.getLeaderboard = async (req, res) => {
  try {
    // MongoDB Aggregation - CORE logic!
    const leaderboard = await Sale.aggregate([
      // 1 - Group by agent name
      {
        $group: {
          _id: "$agentName", // Group by agent name
          totalAmount: { $sum: "$amount" }, // Sum all amounts
          totalSales: { $sum: "$salesCount" }, // Sum all sales
        },
      },
      // 2 - Reshape the document
      {
        $project: {
          _id: 0, // Dont include MongoDB's _id
          agentName: "$_id",
          totalAmount: 1,
          totalSales: 1,
        },
      },
      // 3 - Sort by total amount (descending order)
      {
        $sort: { totalAmount: -1, agentName: 1 }, // -1 = descending, also if tie then alphabetically
      },
    ]);

    // Adding rank (position)
    const rankedLeaderboard = leaderboard.map((agent, index) => ({
      rank: index + 1,
      ...agent,
    }));

    res.status(200).json({
      success: true,
      count: rankedLeaderboard.length,
      data: rankedLeaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard",
      error: error.message,
    });
  }
};

// Get all sales 
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true, 
            count: sales.length,
            data: sales,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sales',
            error: error.message,
        });
    }
};
