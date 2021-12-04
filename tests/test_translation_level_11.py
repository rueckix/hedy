import hedy
from test_level_01 import HedyTester
import hedy_translation
from test_translating import check_local_lang_bool


    # tests should be ordered as follows:
    # * Translation from English to Dutch
    # * Translation from Dutch to English
    # * Translation to several languages
    # * Error handling


class TestsTranslationLevel11(HedyTester):
    level = 11
    keywords_from = hedy_translation.keywords_to_dict('en')
    keywords_to = hedy_translation.keywords_to_dict('nl')

    @check_local_lang_bool
    def test_repeat_english_dutch(self):
        code = "for counter in range 1 to 5\n   print counter"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "voor counter in bereik 1 tot 5\n   print counter"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_repeat2_english_dutch(self):
        code = "repeat 2 times print name"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "herhaal 2 keer print name"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_repeat_dutch_english(self):
        code = "herhaal 3 keer print 'Hedy is fun!'"

        result = hedy_translation.translate_keywords(code, from_lang="nl", to_lang="en", level=self.level)
        expected = "repeat 3 times print 'Hedy is fun!'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_repeat2_dutch_english(self):
        code = "herhaal 2 keer print ask"

        result = hedy_translation.translate_keywords(code, from_lang="nl", to_lang="en", level=self.level)
        expected = "repeat 2 times print ask"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_translate_back(self):
        code ="repeat 4 times print 'Welcome to Hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        result = hedy_translation.translate_keywords(result, from_lang="nl", to_lang="en", level=self.level)

        self.assertEqual(code, result)