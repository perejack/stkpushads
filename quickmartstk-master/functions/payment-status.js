// Netlify function to check payment status from Supabase
const { supabase } = require('./supabase');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Extract reference from path parameter
    const pathParts = event.path.split('/');
    const reference = pathParts[pathParts.length - 1];

    if (!reference) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Payment reference is required'
        })
      };
    }

    console.log('Checking status for reference:', reference);

    // Query Supabase for transaction by reference
    const { data: transaction, error: dbError } = await supabase
      .from('transactions')
      .select('*')
      .eq('reference', reference)
      .maybeSingle();

    if (dbError) {
      console.error('Database query error:', dbError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Error checking payment status'
        })
      };
    }

    if (!transaction) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Payment not found'
        })
      };
    }

    // Map database status to PayHero-compatible format
    let paymentStatus = 'PENDING';
    if (transaction.status === 'success') {
      paymentStatus = 'SUCCESS';
    } else if (transaction.status === 'failed') {
      paymentStatus = 'FAILED';
    } else if (transaction.status === 'cancelled') {
      paymentStatus = 'FAILED'; // Treat cancelled as failed for UI
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payment: {
          status: paymentStatus,
          amount: transaction.amount,
          phoneNumber: transaction.phone,
          reference: transaction.reference,
          mpesaReceiptNumber: transaction.receipt_number,
          transactionDate: transaction.transaction_date,
          resultDescription: transaction.result_description
        }
      })
    };
  } catch (error) {
    console.error('Payment status check error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to check payment status',
        error: error.message
      })
    };
  }
};
