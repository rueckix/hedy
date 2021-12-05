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
    level = 14

    @check_local_lang_bool
    def test_bigger(self):
        code = "hedy is 5\n" \
               "if hedy > 6\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 5\n" \
                   "als hedy > 6\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_smaller(self):
        code = "hedy is 5\n" \
               "if hedy < 6\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 5\n" \
                   "als hedy < 6\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_bigger_equal(self):
        code = "hedy is 5\n" \
               "if hedy >= 6\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 5\n" \
                   "als hedy >= 6\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_smaller_equal(self):
        code = "hedy is 5\n" \
               "if hedy <= 6\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 5\n" \
                   "als hedy <= 6\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_not_equal(self):
        code = "hedy is 5\n" \
               "if hedy != 6\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 5\n" \
                   "als hedy != 6\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

