'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Avatarのラッパーコンポーネント
const StyledAvatar = styled(Avatar)({
  position: 'relative',
  overflow: 'hidden',
});

interface OptimizedAvatarProps extends Omit<AvatarProps, 'src'> {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * next/imageを使用して最適化されたAvatarコンポーネント
 */
export default function OptimizedAvatar({
  src,
  alt,
  width = 40,
  height = 40,
  ...props
}: OptimizedAvatarProps) {
  // srcがない場合や無効な場合は通常のAvatarを表示
  if (!src || src.startsWith('data:') || src === '') {
    return <Avatar alt={alt} {...props} />;
  }

  // サイズが大きい場合にはpriorityをtrueにする
  const isPriority = React.useMemo(() => {
    // AvatarPropsからサイズを推測
    if (props.sx) {
      try {
        // sxのwidthプロパティが存在する場合、そのサイズを判断基準にする
        const sxObj = props.sx as any;
        if (sxObj && typeof sxObj === 'object' && 'width' in sxObj) {
          const widthValue = sxObj.width;
          const numWidth = 
            typeof widthValue === 'number' ? widthValue : 
            typeof widthValue === 'string' ? parseInt(widthValue, 10) : 0;
          return numWidth > 80;
        }
      } catch (e) {
        console.error('Error parsing Avatar sx prop:', e);
      }
    }
    
    // 直接指定されたサイズを判断基準にする
    return width > 80 || height > 80;
  }, [props.sx, width, height]);

  return (
    <StyledAvatar {...props}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        priority={isPriority}
      />
    </StyledAvatar>
  );
} 