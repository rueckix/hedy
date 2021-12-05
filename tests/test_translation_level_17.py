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
    level = 17

    @check_local_lang_bool
    def test_indent_for_loop_english_dutch(self):
        code = "for i in range 1 to 12:\n" \
               "    print 'Hedy' i"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "voor i in bereik 1 tot 12:\n" \
                   "    print 'Hedy' i"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_indent_while_loop_english_dutch(self):
        code = "i is 3\n" \
               "while i < 2:\n" \
               "    print 'Hedy' i"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "i is 3\n" \
                   "zolang i < 2:\n" \
                   "    print 'Hedy' i"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_indent_repeat_list_english_dutch(self):
        code = "hedy is ['hedy', 'andre', 'luca']\n" \
               "for naam in hedy:\n" \
               "    print naam"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is ['hedy', 'andre', 'luca']\n" \
                   "voor naam in hedy:\n" \
                   "    print naam"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_indent_ifs_english_dutch(self):
        code = "hedy is 4\n" \
               "if hedy is 4:\n" \
               "    print 'hedy'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 4\n" \
                   "als hedy is 4:\n" \
                   "    print 'hedy'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_indent_elses_english_dutch(self):
        code = "hedy is 4\n" \
               "if hedy is 4:\n" \
               "    print 'hedy'\n" \
               "else:\n" \
               "    print 'nee'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 4\n" \
                   "als hedy is 4:\n" \
                   "    print 'hedy'\n" \
                   "anders:\n" \
                   "    print 'nee'"

        self.assertEqual(result, expected)


    @check_local_lang_bool
    def test_elif_english_dutch(self):
        code = "hedy is 4\n" \
               "if hedy is 4:\n" \
               "    print 'hedy'\n" \
               "elif hedy is 5:\n" \
               "    print 5\n" \
               "else:\n" \
               "    print 'nee'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "hedy is 4\n" \
                   "als hedy is 4:\n" \
                   "    print 'hedy'\n" \
                   "alsanders hedy is 5:\n" \
                   "    print 5\n" \
                   "anders:\n" \
                   "    print 'nee'"

        self.assertEqual(result, expected)
