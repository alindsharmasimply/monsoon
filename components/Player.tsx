import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import {
  MdGraphicEq,
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircle,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { formatTime } from '../lib/formatters';

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeat) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color='green.600'>
        <ButtonGroup>
          <IconButton
            outline='none'
            variant='link'
            aria-label='shuffle'
            fontSize='24px'
            icon={<MdShuffle />}
            color={shuffle ? 'white' : 'gray.600'}
            onClick={onShuffle}
          />
          <IconButton
            outline='none'
            variant='link'
            aria-label='skip'
            fontSize='24px'
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline='none'
              variant='link'
              aria-label='pause'
              fontSize='40px'
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlaying(false)}
            />
          ) : (
            <IconButton
              outline='none'
              variant='link'
              aria-label='play'
              fontSize='40px'
              icon={<MdOutlinePlayCircle />}
              onClick={() => setPlaying(true)}
            />
          )}

          <IconButton
            outline='none'
            variant='link'
            aria-label='next'
            fontSize='24px'
            icon={<MdSkipNext />}
          />
          <IconButton
            outline='none'
            variant='link'
            aria-label='repeat'
            fontSize='24px'
            icon={<MdOutlineRepeat />}
            color={repeat ? 'white' : 'gray.600'}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color='green.500'>
        <Flex justify='center' align='center'>
          <Box width='10%'>
            <Text fontSize='xs'>{formatTime(seek)}</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              aria-label={['min', 'max']}
              step={1}
              min={0}
              id='player-range'
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              height='10px'
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg='green.800' height='2px'>
                <RangeSliderFilledTrack bg='green.600' height='2px' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0}>
                <Box
                  color='tomato'
                  as={MdGraphicEq}
                  backgroundColor='white'
                  position='absolute'
                />
              </RangeSliderThumb>
            </RangeSlider>
          </Box>
          <Box width='10%' textAlign='right'>
            <Text fontSize='xs'>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
