const { draftEmail } = require('../../services/emailService');

describe('Email Service Unit Tests', () => {
  test('draftEmail should return an object with expected keys', () => {
    const mockJobDetails = { address: '123 Main St' }; // Only address is used in the template
    const mockClientDetails = { name: 'John Doe', email: 'john.doe@example.com' };
    const mockDocumentDetails = { document_type: 'Proposal', file_path: '/path/to/proposal.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails).toHaveProperty('to');
    expect(emailDetails).toHaveProperty('subject');
    expect(emailDetails).toHaveProperty('text');
    expect(emailDetails).toHaveProperty('attachments');
  });

  test('draftEmail should generate email with full job, client, and proposal details', () => {
    const mockJobDetails = { title: '456 Oak Ave' };
    const mockClientDetails = { name: 'Jane Smith', email: 'jane.smith@example.com' };
    const mockDocumentDetails = { document_type: 'proposal', file_path: '/path/to/proposal.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails.to).toBe('jane.smith@example.com');
    expect(emailDetails.subject).toBe('456 Oak Ave');
    expect(emailDetails.text).toContain('Hi Jane Smith,');
    expect(emailDetails.text).toContain('See attached estimate for your review.');
    expect(emailDetails.attachments).toEqual([
      {
        filename: '456 Oak Ave_estimate.pdf',
        path: '/path/to/proposal.pdf',
      },
    ]);
  });

  test('draftEmail should generate email with full job, client, and invoice details', () => {
    const mockJobDetails = { title: '789 Pine Ln' };
    const mockClientDetails = { name: 'Bob Johnson', email: 'bob.johnson@example.com' };
    const mockDocumentDetails = { document_type: 'invoice', file_path: '/path/to/invoice.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails.to).toBe('bob.johnson@example.com');
    expect(emailDetails.subject).toBe('789 Pine Ln');
    expect(emailDetails.text).toContain('Hi Bob Johnson,');
    expect(emailDetails.text).toContain('See attached invoice for your review.');
    expect(emailDetails.attachments).toEqual([
      {
        filename: '789 Pine Ln_invoice.pdf',
        path: '/path/to/invoice.pdf',
      },
    ]);
  });

  test('draftEmail should generate email with full job, client, and report details', () => {
    const mockJobDetails = { title: '101 Maple Rd' };
    const mockClientDetails = { name: 'Alice Williams', email: 'alice.williams@example.com' };
    const mockDocumentDetails = { document_type: 'report', file_path: '/path/to/report.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails.to).toBe('alice.williams@example.com');
    expect(emailDetails.subject).toBe('101 Maple Rd');
    expect(emailDetails.text).toContain('Hi Alice Williams,');
    expect(emailDetails.text).toContain('See attached report for your review.');
    expect(emailDetails.attachments).toEqual([
      {
        filename: '101 Maple Rd_report.pdf',
        path: '/path/to/report.pdf',
      },
    ]);
  });

  test('draftEmail should handle missing client name', () => {
    const mockJobDetails = { title: '222 Birch St' };
    const mockClientDetails = { name: null, email: 'no.name@example.com' }; // Missing name
    const mockDocumentDetails = { document_type: 'proposal', file_path: '/path/to/proposal.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails.to).toBe('no.name@example.com');
    expect(emailDetails.subject).toBe('222 Birch St');
    expect(emailDetails.text).toContain('Hi null,'); // Expecting "Hi null," when name is missing
    expect(emailDetails.attachments[0].filename).toBe('222 Birch St_estimate.pdf');
  });

  test('draftEmail should handle missing job title (subject uses title)', () => {
    const mockJobDetails = { title: null }; // Missing title
    const mockClientDetails = { name: 'Charlie Brown', email: 'charlie.b@example.com' };
    const mockDocumentDetails = { document_type: 'invoice', file_path: '/path/to/invoice.pdf' };

    const emailDetails = draftEmail(mockJobDetails, mockClientDetails, mockDocumentDetails);

    expect(emailDetails.to).toBe('charlie.b@example.com');
    expect(emailDetails.subject).toBe("Charlie Brown's Job Document"); // Expecting fallback subject
    expect(emailDetails.text).toContain('Hi Charlie Brown,');
    // Attachment filename might be impacted if title is missing - adjust filename generation logic if needed
    expect(emailDetails.attachments[0].filename).toBe("Charlie Brown's Job Document_invoice.pdf"); // Or handle this case in draftEmail
  });
});