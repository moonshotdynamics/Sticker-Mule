import React, { FC } from 'react';
import Image from 'next/image';
import { useTheme } from 'styled-components';
import { isEmpty, isNil } from 'ramda';
import useMediaQuery from 'hooks/useMediaQuery';
import { LocaleType } from 'types/props';
import Button, { PropsTypes as ButtonProps } from 'modules/components/Button';
import RichText from 'modules/components/RichText';
import VideoPlayer from 'modules/components/VideoPlayer';
import InfoBox, {
  PropsTypes as StatisticsContentProps,
} from 'modules/components/InfoBox';
import Checklist, {
  PropsTypes as ChecklistProps,
} from 'modules/components/Checklist';
import {
  Wrapper,
  ContentWrapper,
  Title,
  Subtitle,
  MediaWrapper,
  Content,
  CTA,
  CheckListWrapper,
  ImageWrapper,
  CaptionText,
  StatisticWrapper,
  Container,
  BlockTitle,
  ExternalContainer,
  ExternalWrapper
} from './Styles';

type PropsTypes = {
  title: string;
  contentBlockTitle?: string;
  subtitle: string;
  captionText: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  mediaPosition: 'left' | 'right';
  mediaPositionMobile: 'top' | 'bottom'
  backgroundColor:
     {
        family: 'surface';
        type: 'neutral';
        color: 'light';
      }
    | {
        family: 'surface';
        type: 'medical';
        color: 'light';
      }
    | {
        family: 'surface';
        type: 'white';
        color: 'xLight';
      };
  showPrimary: boolean;
  button: ButtonProps;
  checklist?: ChecklistProps;
  fullBleed: boolean;
  statisticsContent?: StatisticsContentProps;
  isContentBlockGroup?: boolean;
  isLastBlock?: boolean;
  locale?: LocaleType;
};

export const ContentBlock: FC<PropsTypes> = ({
  title = '',
  contentBlockTitle = '',
  subtitle = '',
  imageUrl = '',
  videoUrl = '',
  videoThumbnail = '',
  mediaPosition = 'left',
  mediaPositionMobile = 'top',
  backgroundColor = { family: 'surface', type: 'neutral', color: 'light' },
  showPrimary = false,
  button,
  checklist,
  fullBleed = false,
  captionText = '',
  statisticsContent,
  isContentBlockGroup = false,
  isLastBlock = false,
  locale,
}: PropsTypes) => {
  const { device: { tabletSmall } = {} } = useTheme();
  const isMobile = useMediaQuery(tabletSmall, true);
  const hasImage = imageUrl.length > 0;
  const videoDimensions = {
    height: {
      desktop: 344,
      tablet: 344,
      mobile: 336,
    }
  };

  const stackedContentBlockDimensions = {
    height: {
      desktop: 576,
      tablet: 382,
      mobile: 336,
    }
  }

  const noBackground = {
    family: 'surface',
    type: 'white',
    color: 'xLight',
  }
  
  const getMediaPosition = () => {
    return isMobile ? mediaPositionMobile : mediaPosition;
  };

  const renderMediaContent = () => {
    if (imageUrl && hasImage) {
      return (
        <ImageWrapper
          background={isContentBlockGroup ? noBackground : backgroundColor}
          fullBleed={fullBleed}
          mediaPosition={getMediaPosition()}
        >
          <Image
            src={imageUrl}
            alt=""
            fill={true}
            data-qa="content-image"
          />
        </ImageWrapper>
      );
    }

    if (videoUrl && imageUrl.length === 0) {
      return (
        <VideoPlayer
          videoUrl={videoUrl}
          videoThumbnail={videoThumbnail}
          videoDimensions={
            isContentBlockGroup
              ? stackedContentBlockDimensions
              : videoDimensions
          }
          data-qa="content-video"
          mediaPosition={getMediaPosition()}
          background={isContentBlockGroup ? noBackground : undefined}
          isContentBlockGroup={isContentBlockGroup}
          locale={locale}
        />
      );
    }

    return null;
  };

  const isValue = (val) => {
    return isEmpty(val) || isNil(val);
  }

 
  return (
    <ExternalWrapper
      isContentBlockGroup={isContentBlockGroup}
      mediaPosition={getMediaPosition()}
      fullBleed={fullBleed}
    >
      <Wrapper>
        <ExternalContainer isLastBlock={isLastBlock} hasVideo={!!videoUrl}>
          {isContentBlockGroup && contentBlockTitle && (
            <BlockTitle>{contentBlockTitle}</BlockTitle>
          )}
          <Container
            mediaPosition={getMediaPosition()}
            background={isContentBlockGroup ? noBackground : backgroundColor}
            fullBleed={fullBleed}
            hasVideo={!!videoUrl}
            hasImage={hasImage}
            id="ContentBlock"
            isContentBlockGroup={isContentBlockGroup}
          >
            <MediaWrapper
              hasVideo={!!videoUrl}
              fullBleed={fullBleed}
              data-qa="media-wrapper"
              isContentBlockGroup={isContentBlockGroup}
            >
              {renderMediaContent()}
            </MediaWrapper>
            <ContentWrapper
              background={isContentBlockGroup ? noBackground : backgroundColor}
              mediaPosition={getMediaPosition()}
              hasVideo={!!videoUrl}
              data-qa="content-wrapper"
              isContentBlockGroup={isContentBlockGroup}
            >
              <Content
                background={
                  isContentBlockGroup ? noBackground : backgroundColor
                }
                isContentBlockGroup={isContentBlockGroup}
                isLastBlock={false}
              >
                <Title data-qa="content-title">{title}</Title>
                <Subtitle>
                  <RichText text={subtitle} linkSize="medium" />
                </Subtitle>
                {!isEmpty(checklist) && (
                  <CheckListWrapper>
                    <Checklist {...checklist} />
                  </CheckListWrapper>
                )}
                {!isValue(statisticsContent) && (
                  <StatisticWrapper background={backgroundColor}>
                    <InfoBox {...statisticsContent} type="secondary" />
                  </StatisticWrapper>
                )}
                {button && !isEmpty(button) && (
                  <>
                    <CTA>
                      <Button
                        {...button}
                        data-qa="content-cta"
                        type={showPrimary ? 'primary' : 'secondary'}
                      />
                    </CTA>
                    <CaptionText>{captionText}</CaptionText>
                  </>
                )}
              </Content>
            </ContentWrapper>
          </Container>
        </ExternalContainer>
      </Wrapper>
    </ExternalWrapper>
  );

};

export default ContentBlock;