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
    level = 13

    @check_local_lang_bool
    def test_and_condition_english_dutch(self):
        code = "naam is 'hedy'\n" \
               "leeftijd is 2\n" \
               "if naam is 'hedy' and leeftijd is 2\n" \
               "    print 'hallo'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "naam is 'hedy'\n" \
                   "leeftijd is 2\n" \
                   "als naam is 'hedy' en leeftijd is 2\n" \
                   "    print 'hallo'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_or_condition_english_dutch(self):
        code = "naam is 'hedy'\n" \
               "leeftijd is 2\n" \
               "if naam is 'niet hedy' or leeftijd is 2\n" \
               "    print 'hallo'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "naam is 'hedy'\n" \
                   "leeftijd is 2\n" \
                   "als naam is 'niet hedy' of leeftijd is 2\n" \
                   "    print 'hallo'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_and_condition_acces_list_english_dutch(self):
        code = "naam is 'hedy', 'niet hedy'\n" \
               "if 'hedy' in naam and 'niet hedy' in naam\n" \
               "    print 'hallo'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "naam is 'hedy', 'niet hedy'\n" \
                   "als 'hedy' in naam en 'niet hedy' in naam\n" \
                   "    print 'hallo'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_or_condition_acces_list_english_dutch(self):
        code = "naam is 'hedy', 'niet hedy'\n" \
               "if 'hedy' in naam or 'niet hedy' in naam\n" \
               "    print 'hallo'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "naam is 'hedy', 'niet hedy'\n" \
                   "als 'hedy' in naam of 'niet hedy' in naam\n" \
                   "    print 'hallo'"

        self.assertEqual(result, expected)