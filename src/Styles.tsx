import styled from 'styled-components';
import {
  flex,
  flexColumn,
  heading3,
  heading4,
  body3,
  body6,
  color,
  getSpacing,
  flexFullCenter,
  backgroundColor,
  bold,
  body1,
  heightWidthFree,
  fullSize,
  flexCenterAlign,
  paddingTRBL,
  container,
  flexCenterJustify,
  getSpacingVH,
  paddingVH,
  flexStartAlign,
} from 'styles/Mixins';
import { backgroundProps } from 'types/props';

export interface ContainerProps {
  mediaPosition: string;
  background: backgroundProps;
  fullBleed: boolean;
  hasVideo: boolean;
  hasImage: boolean;
  isContentBlockGroup: boolean;
}

export const ExternalContainer = styled.div<{ isLastBlock: boolean; hasVideo: boolean }>`
${({hasVideo}) => hasVideo && fullSize}
  ${flex}
  ${flexColumn}
  padding-bottom: ${({ isLastBlock }) => isLastBlock && getSpacing('20x')};
  @media ${({ theme }) => theme.device.tabletSmall} {
    ${flexCenterAlign}
  }
`;

export const Container = styled.div<ContainerProps>`
  ${container}
  ${flexCenterJustify}
  border-radius: ${getSpacing('4x')};
  flex-direction: ${({ mediaPosition }) =>
    mediaPosition === 'left' ? 'row' : 'row-reverse'};
  ${heightWidthFree('auto', '100%')};

  @media ${({ theme }) => theme.device.tabletSmall} {
    ${flexColumn};
    ${flexCenterAlign};
    flex-direction: ${({ mediaPosition }) =>
    mediaPosition === 'top' ? 'column' : 'column-reverse'};
    margin: ${({ hasVideo, hasImage }) =>
    hasVideo && hasImage ? '0px' : 'auto'};
  }
  @media ${({ theme }) => theme.device.tabletLarge} {
    ${({ hasVideo }) =>
    hasVideo
      ? heightWidthFree('100%', '100%')
      : heightWidthFree('auto', '100%')};
  }
`;

export const BlockTitle = styled.div`
  ${color('text', 'xDark')};
  ${heading3};
  margin-bottom: ${getSpacing('20x')};
  @media ${({ theme }) => theme.device.tabletSmall} {
    ${heading4};
    margin-bottom: ${getSpacing('6x')};
    align-self: flex-start;
    padding-top: ${getSpacing('10x')};
  }
`;

export const ExternalWrapper = styled.div<{ isContentBlockGroup: boolean; mediaPosition: string; fullBleed: boolean }>`
  ${flex}
  ${flexColumn}
  ${({ isContentBlockGroup }) =>
    isContentBlockGroup
      ? paddingTRBL('20x', '0x', '7x', '0x')
      : paddingVH('20x', '0x')};
@media ${({ theme }) => theme.device.tabletSmall} {
  ${({ fullBleed, mediaPosition }) =>
    paddingTRBL(
      (fullBleed && mediaPosition === 'top') ? '0x' : '4x',
      '4x',
      '4x',
      '4x'
    )};
}
`;

export const Wrapper = styled.div`
  ${fullSize}
  ${flexCenterJustify}
`;

export const ContentWrapper = styled.div<{
  background: backgroundProps;
  mediaPosition: string;
  hasVideo: boolean;
  isContentBlockGroup: boolean;
}>`
  ${flexColumn}
  ${flexFullCenter}
   ${({ hasVideo, isContentBlockGroup }) =>
    ( hasVideo && !isContentBlockGroup)
      ? heightWidthFree('344px', '50%')
      : heightWidthFree('auto', '50%')};

  ${({ background }) =>
    backgroundColor(background.family, background.type, background.color)}
  border-radius: ${({ mediaPosition }) =>
    mediaPosition === 'left' ? '0px 16px 16px 0px' : '16px 0px 0px 16px'};
  padding-right: ${({ background, mediaPosition }) =>
    background.type === 'white' && mediaPosition === 'right'
      ? getSpacing('24x')
      : '0px'};
  padding-left: ${({ background, mediaPosition }) =>
    background.type === 'white' && mediaPosition === 'left'
      ? getSpacing('24x')
      : '0px'};

  @media ${({ theme }) => theme.device.tabletLarge} {
    padding: ${getSpacing('0x')};
  }

  @media ${({ theme }) => theme.device.tabletSmall} {
    max-width: 328px;
    border-radius: ${({ background, mediaPosition }) =>
    !(background.type === 'white') && mediaPosition === 'top'
      ? '0px 0px 16px 16px'
      : '16px 16px 0px 0px'};
    width: 100%;
    height: auto;
    padding: ${({ background }) =>
    !(background.type === 'white') ? '0px 0px 40px 0px' : '0px'};
  }
`;

export const Content = styled.div<{
  background: backgroundProps;
  isContentBlockGroup: boolean;
  isLastBlock: boolean;
}>`
  ${flexColumn}
  margin: ${({ background }) =>
    background.type === 'white' ? 'auto' : getSpacingVH('24x', '16x')};

  @media ${({ theme }) => theme.device.tabletLarge} {
    margin: ${getSpacing('12x')};
  }

  @media ${({ theme }) => theme.device.tabletSmall} {
    width: ${({ background }) =>
    background.type === 'white' ? '328px' : '280px'};
    margin: ${({ background }) =>
    background.type === 'white' ? '24px 24px 0px 24px' : 'auto'};
    ${({ background, isContentBlockGroup, isLastBlock }) =>
    background.type === 'white' && !isContentBlockGroup && !isLastBlock
      ? paddingTRBL('0x', '0x', '10x', '0x')
      : background.type === 'white' && isContentBlockGroup && !isLastBlock
        ? paddingTRBL('0x', '0x', '6x', '0x')
        : background.type === 'white' && isContentBlockGroup && isLastBlock
          ? paddingVH('0x', '0x')
          : paddingTRBL('6x', '6x', '0x', '6x')}
  }
`;

export const Title = styled.div`
  ${heading3};
  ${color('text', 'xDark')};
  margin-bottom: ${getSpacing('4x')};

  @media ${({ theme }) => theme.device.desktopSmall} {
    ${heading4};
  }

  @media ${({ theme }) => theme.device.tabletSmall} {
    ${bold(body1)};
    margin-bottom: ${getSpacing('2x')};
  }
`;

export const Subtitle = styled.div`
  ${body3};
  ${color('text', 'xDark')};

  a {
    ${color('text', 'xDark')}
  }
`;

export const CaptionText = styled.div`
  ${color('text', 'xDark')};
  ${body6};
  margin-top: ${getSpacing('5x')};
`;

export const MediaWrapper = styled.div<{
  fullBleed: boolean;
  hasVideo: boolean;
  isContentBlockGroup: boolean;
}>`
  ${flex};
  border-radius: ${getSpacing('4x')};
  width: 50%;
  @media ${({ theme }) => theme.device.tabletSmall} {
    width: ${({ hasVideo }) => (hasVideo ? '328px' : '100%')};
    max-width: ${({fullBleed}) => fullBleed ? 'none' : '328px'};
  }
`;

export const ImageWrapper = styled.div<{
  background: backgroundProps;
  fullBleed: boolean;
  mediaPosition: string;
}>`
  ${fullSize}
  @media ${({ theme }) => theme.device.tabletLarge} {
    height: 100%;
    width: 100%;
  }


  video {
    ${fullSize}
    object-fit: cover;
    position: relative;
  }

  img {
    ${fullSize}
    object-fit: cover;
    position: relative !important;
    border-radius: ${({ background, mediaPosition }) =>
    background.type === 'white'
      ? getSpacing('4x')
      : mediaPosition === 'left'
        ? '16px 0px 0px 16px'
        : '0px 16px 16px 0px'};

    @media ${({ theme }) => theme.device.tabletSmall} {
      object-fit: cover;
      border-radius: ${({ background, mediaPosition, fullBleed }) => {
    if (
      !(background.type === 'white') &&
          mediaPosition === 'top' &&
          !fullBleed
    ) {
      return '16px 16px 0px 0px';
    } else if (
      !(background.type === 'white') &&
          mediaPosition === 'bottom' &&
          !fullBleed
    ) {
      return '0px 0px 16px 16px';
    } else if (fullBleed) {
      return '0px';
    } else if (
      !(background.type === 'white') &&
          mediaPosition === 'right'
    ) {
      return '0px 0px 16px 16px';
    } else {
      return getSpacing('4x');
    }
  }};
    }
  }
`;

export const CTA = styled.div`
  margin-top: ${getSpacing('5x')};
  width: 320px;
  @media ${({ theme }) => theme.device.tabletSmall} {
    width: auto;
  }
`;

export const CheckListWrapper = styled.div`
  display: block;
  margin-top: ${getSpacing('3x')};
  #checklist_wrapper {
    ${flexStartAlign}
  }
  #checklist_text {
    max-width: 188px;
    margin-top: -${getSpacing('1x')};
  }
`;

export const StatisticWrapper = styled.div<{
  background: backgroundProps;
}>`
  margin-top: ${getSpacing('8x')};
  width: 468px;
  a {
    ${color('text', 'xDark')};
  }

  @media ${({ theme }) => theme.device.tabletLarge} {
    width: auto;
  }

  @media ${({ theme }) => theme.device.tabletSmall} {
    width: ${({ background }) =>
    background.type === 'white' ? '328px' : '280px'};
  }
`;