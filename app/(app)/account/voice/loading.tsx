export default function Loading() {
  return (
    <div style={{ display:'grid',placeItems:'center',minHeight:'40vh' }}>
      <div style={{
        width:32,height:32,borderRadius:'50%',
        border:'3px solid #ddd', borderTopColor:'#555',
        animation:'spin 1s linear infinite',
      }} />
      {/* <style jsx>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style> */}
    </div>
  );
}