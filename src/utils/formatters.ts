export function formatPrice(price: number | undefined): string {
  if (price === undefined || isNaN(price)) {
    return 'N/A';
  }
  return new Intl.NumberFormat('en-SG', { 
    style: 'currency', 
    currency: 'SGD', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Ensure no decimal for whole numbers
  }).format(price);
}

// Add other utility functions as needed
