import React, { useRef,useEffect,useState } from 'react';
import {ChatTeardropDots} from 'phosphor-react-native'
import { Platform, TouchableOpacity, } from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'

import { styles } from './styles';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {KeyboardAvoidingView} from 'react-native'
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';

  

import { Keyboard } from 'react-native';
import { Success } from '../Success';

export const useKeyboardListener = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isVisible;
};
export type FeedbackType = keyof typeof feedbackTypes
function WidgetComponent() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ?
            <Success onSendAnotherFeedback={handleRestartFeedback} />
            :
            <>
              {
                feedbackType ?
                  <Form
                    feedbackType={feedbackType}
                    
                    onFeedbackCanceled={handleRestartFeedback}
                    onFeedbackSent={handleFeedbackSent}
                  />
                  :
                  <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(WidgetComponent)