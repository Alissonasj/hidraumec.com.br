import { Product } from '@/lib/types';

export default function ProductVisual({
  type,
  className = ''
}: {
  type: Product['visual'];
  className?: string;
}) {
  return (
    <div
      className={`product-visual product-visual-${type} ${className}`}
      aria-hidden='true'
    >
      <div className='machine-shadow' />
      <div className='machine-body' />
      <div className='machine-detail' />
      <div className='machine-hub' />
    </div>
  );
}
