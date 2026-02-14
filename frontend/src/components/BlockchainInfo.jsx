const BlockchainInfo = ({ ipfsHash, blockchainHash }) => {
  return (
    <div style={{
      background: '#f0f8ff',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '15px'
    }}>
      <h4 style={{ color: '#2196F3', marginBottom: '10px' }}>🔗 Blockchain & IPFS Details</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>📦 IPFS Hash:</strong>
        <div style={{
          background: '#fff',
          padding: '8px',
          borderRadius: '4px',
          marginTop: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          wordBreak: 'break-all'
        }}>
          {ipfsHash || 'Not yet stored'}
        </div>
      </div>

      <div>
        <strong>⛓️ Blockchain Hash:</strong>
        <div style={{
          background: '#fff',
          padding: '8px',
          borderRadius: '4px',
          marginTop: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          wordBreak: 'break-all'
        }}>
          {blockchainHash || 'Not yet recorded'}
        </div>
      </div>

      <p style={{
        fontSize: '11px',
        color: '#666',
        marginTop: '10px',
        marginBottom: '0'
      }}>
        ✓ Certificate stored on decentralized IPFS<br/>
        ✓ Proof recorded on Polygon blockchain<br/>
        ✓ Tamper-proof and permanently verifiable
      </p>
    </div>
  );
};

export default BlockchainInfo;
