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
    level = 16

    @check_local_lang_bool
    def test_assign_list_english_dutch(self):
        code = "fruit is ['appel', 'banaan', 'kers']"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "fruit is ['appel', 'banaan', 'kers']"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_access_list_english_dutch(self):
        code = "fruit is ['appel', 'banaan', 'kers']\n" \
               "print fruit[2]" \


        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "fruit is ['appel', 'banaan', 'kers']\n" \
                   "print fruit[2]" \


        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_access_list_random_dutch_english(self):
        code = "fruit is ['appel', 'banaan', 'kers']\n" \
               "print fruit[willekeurig]" \

        result = hedy_translation.translate_keywords(code, from_lang="nl", to_lang="en", level=self.level)
        expected = "fruit is ['appel', 'banaan', 'kers']\n" \
                   "print fruit[random]" \

        self.assertEqual(result, expected)
